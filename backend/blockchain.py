from web3 import Web3
import os
from dotenv import  load_dotenv
import json

load_dotenv()

ALCHEMY_URL = "https://zetachain-mainnet.g.alchemy.com/v2/"
CONTRACT_ADDRESS = os.getenv("ZETA_CONTRACT_ADDR")
ALCHEMY_API_KEY = os.getenv("ALCHEMY_API_KEY")
ABI = []

with open("contract_abi.json", "r") as abi_file:
    ABI = json.load(abi_file)

web3 = Web3(Web3.HTTPProvider(ALCHEMY_URL+ALCHEMY_API_KEY))

contract = web3.eth.contract(address=CONTRACT_ADDRESS, abi=ABI)

def event_listener():
    event_filter = contract.events.BetPlaced.createFilter(fromBlock="latest")
    while True:
        for event in event_filter.get_new_entries():
            print(f"New Bet: {event['args']}")
