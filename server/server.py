import asyncio
import json
import os
from dotenv import load_dotenv
import websockets
from matchmaking import MatchmakingPlayer

load_dotenv()

WS_PORT = int(os.getenv("WS_PORT", 8765))
connected = {}
pair_queue = []

async def handler(ws):
    player = MatchmakingPlayer()
    connected[ws] = player
    pair_queue.append(ws)

    if len(pair_queue) >= 2:
        p1 = pair_queue.pop(0)
        p2 = pair_queue.pop(0)
        await p1.send(json.dumps({"type": "match", "opponent": player.rating}))
        await p2.send(json.dumps({"type": "match", "opponent": player.rating}))

    try:
        async for message in ws:
            data = json.loads(message)
            # TODO: handle gameplay events
    finally:
        del connected[ws]
        if ws in pair_queue:
            pair_queue.remove(ws)

async def main():
    async with websockets.serve(handler, "0.0.0.0", WS_PORT):
        print(f"Server running on ws://0.0.0.0:{WS_PORT}")
        await asyncio.Future()

if __name__ == '__main__':
    asyncio.run(main())