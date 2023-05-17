import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import ImgCrypto from './img/imagen-criptos.png'
import Form from './components/Form'
import Result from './components/Result'
import Spinner from './components/Spinner'



const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Img = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

const Heading =  styled.h1`
  font-family: 'Lato', sans-serif; 
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  font-size: 34px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`

function App() {

  const [coins, setCoins] = useState({})
  const [result, setResult] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    if(Object.keys(coins).length > 0) {

      const calculateCrypto = async () => {
        setLoading(true)
        setResult({})
        const { coin, cryptocoin } = coins
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptocoin}&tsyms=${coin}`
        const response = await fetch(url)
        const result = await response.json()
        setResult(result.DISPLAY[cryptocoin][coin])
        setLoading(false)
      }

      calculateCrypto()
    }
  }, [coins])

  return (
    <Container>
    <Img src={ImgCrypto}/>

    <div>
    <Heading> Calculate CryptoCurrency </Heading>
    <Form
      setCoins={setCoins}
    />
    {loading && <Spinner/>}
    {result.PRICE && <Result result={result}/>}
    </div>

    </Container>
  )
}

export default App
