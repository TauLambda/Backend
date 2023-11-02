import express from 'express'
import Server from './providers/Server'

async function main() {
    const app = new Server();
    await app.init();
}

main();