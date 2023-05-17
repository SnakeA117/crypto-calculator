import styled from "@emotion/styled"

const Results = styled.div`
    color: #FFF;
    font-family: 'Lato', sans-serif;
    display: flex;
    align-items: start;
    gap: 1rem;
    margin-top: 30px;
    align-items: center;
`
const Texts = styled.p`
    font-size: 18px;
    span {
        font-weight: 700;
    }
`

const Price = styled.p`
    font-size: 30px;
    span {
        font-weight: 700;

    }
`
const Image = styled.img`
    display: block;
    width: 120px;
`
const Result = ({result}) => {
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE} = result;
  return (
    <Results>
        <Image src={`https://cryptocompare.com/${IMAGEURL}`} alt="Crypto image"></Image>
        <div>
        <Price>The value is: <span>{PRICE}</span></Price>
       <Texts>The highest price today: <span>{HIGHDAY}</span></Texts>
       <Texts>The lowest price today: <span>{LOWDAY}</span></Texts>
       <Texts>Changes last 24 Hours: <span>{CHANGEPCT24HOUR}</span></Texts>
       <Texts>Last update: <span>{LASTUPDATE}</span></Texts>
        </div>
    </Results>
  )
}

export default Result