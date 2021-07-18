#!/bin/env python

import asyncio
import json

import websockets

CLIENTS = set()
STATE = {'players': lambda: len(CLIENTS), 'seats': set()}


def server_is_full():
    return len(CLIENTS) >= 2


async def broadcast_state():
    def set_default(obj):
        if isinstance(obj, set):
            return list(obj)
        elif callable(obj):
            return obj()
        raise TypeError

    if len(CLIENTS) > 0:
        state = json.dumps(STATE, default=set_default)
        tasks = []
        for ws in CLIENTS:
            task = asyncio.create_task(ws.send(state))
            tasks.append(task)
            await asyncio.wait(tasks)


async def register(client):
    CLIENTS.add(client)
    await broadcast_state()


async def unregister(client):
    CLIENTS.remove(client)
    await broadcast_state()


def process(messageJSON):
    message = json.loads(messageJSON)
    seats = STATE['seats']
    seats.difference_update(message[0])
    seats.update(message[1])


async def listen(websocket):
    await register(websocket)
    async for message in websocket:
        process(message)
        await broadcast_state()
    await unregister(websocket)


async def greet(websocket, path):
    if (server_is_full()):
        await websocket.close(4000)
    else:
        await listen(websocket)


start_server = websockets.serve(greet, 'localhost', 8765)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
