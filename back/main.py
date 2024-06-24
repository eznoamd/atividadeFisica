from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sympy import *

# fastapi corrections
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_methods=['*'],
    allow_headers=['*'],
    allow_credentials=True,
    allow_origins=['http://localhost:3000']
)

# class of the request
class EquacBase(BaseModel):
    pressaoInit: int | None = None,
    volumeInit: int | None = None,
    temperaturaInit: int | None = None,
    pressao: int | None = None,
    volume: int | None = None,
    temperatura: int | None = None,

    tipo: str

# route calc
@app.post("/calc")
async def calcBase(eq:EquacBase):
    # isos correction
    if eq.tipo == 'T':
        eq.temperatura = 1
        eq.temperaturaInit = 1
    elif eq.tipo == 'V':
        eq.volume = 1
        eq.volumeInit = 1
    elif eq.tipo == 'P':
        eq.pressao = 1
        eq.pressaoInit = 1

    # data correction
    if(eq.pressao == 0):
        eq.pressao = Symbol('P')

    if(eq.pressaoInit == 0):
        eq.pressaoInit = Symbol('Po')

    if(eq.volume == 0):
        eq.volume = Symbol('V')

    if(eq.volumeInit == 0):
        eq.volumeInit = Symbol('Vo')

    if(eq.temperatura == 0):
        eq.temperatura = Symbol('T')

    if(eq.temperaturaInit == 0):
        eq.temperaturaInit = Symbol('To')
    
    eqPVT = Eq(eq.pressao * eq.volume/eq.temperatura , eq.pressaoInit * eq.volumeInit/eq.temperaturaInit)
    resolved = str(solve(eqPVT)).replace('[','').replace(']','')

    return(resolved)