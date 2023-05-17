import styled from "@emotion/styled"
import useSelectCoin from "../hooks/useSelectCoin"
import { coins } from "../data/coins"
import { useState, useEffect } from "react"
import Error from "./Error"



const InputSubmit = styled.input`
 background-color: #9497FF;
 border: none;
 width: 100%;
 padding: 10px;
 color: #FFF;
 font-weight: 700;
 text-transform: uppercase;
 font-size: 20px;
 border-radius: 5px;
 transition: background-color .3s ease;
 margin-top: 30px;

 &:hover{
    background-color: #7a7cfe96;
    cursor: pointer;
 }
`

const Form = ({setCoins}) => {
  const [ cryptos, setCryptos ] = useState([])
  const [ error, setError ] = useState(false)
  const [ coin, SelectCoins ] = useSelectCoin('Choose your coin', coins)
  const [ cryptocoin, SelectCryptocoin ] = useSelectCoin('Choose your crypto', cryptos)


  useEffect(() => {
    const consultAPI = async () => {
      const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"
      const response = await fetch(url)
      const result = await response.json()

      const arrayCrypto = result.Data.map(crypto => {
        const object = {
            id: crypto.CoinInfo.Name,
            name: crypto.CoinInfo.FullName
        }
        return object
      })
      setCryptos(arrayCrypto)
    }
    consultAPI();
  }, [])
  
  const handleSubmit = e => {
    e.preventDefault()
    if([coin, cryptocoin].includes('')) {
      setError(true)
      return
    } 

    setError(false)
    setCoins({
      coin,
      cryptocoin,
    })
  }

  return (
    <>
        {error && <Error>All fields are mandatory</Error>}
        <form
          onSubmit={handleSubmit}
        >
            <SelectCoins/>
            <SelectCryptocoin/>
            {coin}
            <InputSubmit 
            type="submit" 
            value="calculate" 
            />
        </form>
    </>
  )
}

export default Form