// importando as dependencias
const bitcoin = require('bitcoinjs-lib')
const bip39 = require('bip39')

// definir a rede: bitcoin = rede principal/mainnet, testnet = rede de testes
const network = bitcoin.networks.testnet

// derivação de carteiras HD
const path = `m/49'/1'/0'/0`

// criando o mnemonic para a seed (palavras de senha)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

// criando a raíz da carteira HD
const root = bitcoin.bip32.fromSeed(seed, network)

// criando uma conta - par de pvt-pubkeys
const account = root.derivePath(path)
const node = account.derive(0).derive(0)

// criando o endereço BTC
const btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Carteira Gerada")
console.log("Endereço: ", btcAddress)
console.log("Chave Privada:", node.toWIF())
console.log("Seed", mnemonic)
