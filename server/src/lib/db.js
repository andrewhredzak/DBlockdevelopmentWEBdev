import mongoose from 'mongoose';

let state = {
  connected: false,
  connecting: false,
};

export function isConnected() {
  return state.connected && mongoose.connection?.readyState === 1;
}

export async function connectMongo(uri) {
  if (!uri) return false;
  if (state.connected) return true;
  if (state.connecting) return false;
  try {
    state.connecting = true;
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    state.connected = true;
    return true;
  } catch (err) {
    console.error('[db] Mongo connection failed:', err.message);
    state.connected = false;
    return false;
  } finally {
    state.connecting = false;
  }
}

