<#!
.SYNOPSIS
    Connect to the Lightsail Ubuntu instance via SSH.

.DESCRIPTION
    Wraps the ssh command with optional parameters for key path, host, user, and port.
    Provides basic validation that the private key file exists.

.EXAMPLE
    ./connect-DBlock-lightsail.ps1
    (Uses defaults to connect to the configured server.)

.EXAMPLE
    ./connect-DBlock-lightsail.ps1 -Port 2222 -VerboseSSH

.EXAMPLE
    ./connect-DBlock-lightsail.ps1 -ExtraArgs "-L 8080:localhost:80" -RemoteCommand "uptime"
#>
[CmdletBinding()] param (
    [string]$KeyPath = "$env:USERPROFILE\.ssh\LightsailDefaultKey-us-west-2.pem",
    [string]$User = "ubuntu",
    # NOTE: renamed from $Host to $Hostname to avoid conflict with automatic variable $Host
    [string]$Hostname = "44.254.11.31",
    [int]$Port = 22,
    [string]$RemoteCommand,
    [string]$ExtraArgs,
    [switch]$VerboseSSH,
    [switch]$DryRun
)

function Write-Info($msg) { Write-Host "[INFO ] $msg" -ForegroundColor Cyan }
function Write-Warn($msg) { Write-Host "[WARN ] $msg" -ForegroundColor Yellow }
function Write-Err ($msg) { Write-Host "[ERROR] $msg" -ForegroundColor Red }

if (-not (Test-Path -LiteralPath $KeyPath)) {
    Write-Err "Private key not found at: $KeyPath"; exit 1
}

# Build SSH argument list
$sshArgs = @()
if ($Port -ne 22) { $sshArgs += @("-p", $Port) }
$sshArgs += @("-i", $KeyPath)
if ($VerboseSSH) { $sshArgs += "-v" }
if ($ExtraArgs) { 
    # Split on spaces but allow quoted segments
    $split = [System.Management.Automation.PSParser]::Tokenize($ExtraArgs, [ref]$null) | Where-Object { $_.Type -eq 'String' } | ForEach-Object { $_.Content }
    if ($split.Count -eq 0) { $split = $ExtraArgs.Split(' ') }
    $sshArgs += $split
}

$target = "$User@$Hostname"
$sshArgs += $target

if ($RemoteCommand) { $sshArgs += $RemoteCommand }

Write-Info "Executing SSH: ssh $($sshArgs -join ' ')"
if ($DryRun) { Write-Warn "DryRun specified - not executing."; return }

try {
    & ssh @sshArgs
    $exitCode = $LASTEXITCODE
    if ($exitCode -ne 0) { Write-Warn "ssh exited with code $exitCode" }
    exit $exitCode
} catch {
    Write-Err "Failed to invoke ssh: $($_.Exception.Message)"; exit 2
}
