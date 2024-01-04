import {useEffect,useState} from 'react'
import styled from '@emotion/styled'
import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas'
import Error from './Error'


const InputSubmit = styled.input`
      background-color: #9497FF;
      border : none;
      width: 100%;
      padding:10px;
      color: #FFF;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 20px;
      border-radius: 5px;
      transition: backgroud-color .3s ease;
      margin-top: 30px;

      &:hover{
            background-color: #7A7DFE;
            cursor: pointer;
      }
`

const Formulario = ({setMonedas}) => {

  const [criptos, setCriptos] = useState([])
  const [error, setError] = useState(false)

  const [ moneda, SelectMonedas] = useSelectMonedas('Elige tu moneda', monedas)
  
  const [ criptoMoneda, SelectCriptoMoneda] = useSelectMonedas('Elige tu criptomoneda', criptos)

  useEffect(() => {
      const consultarApi = async () => {
        
        const url = 'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=20&tsym=USD'

        const resp = await fetch(url)
        const result = await resp.json()
        console.log(result.Data)

        const arrayCripros = result.Data.map( cripto => {

          const objeto ={
            id: cripto.CoinInfo.Name,
            nombre: cripto.CoinInfo.FullName
          }
          return objeto
        })
        setCriptos(arrayCripros)
      }
      consultarApi()
  }, []);

  const handleSubmit = e => {
    e.preventDefault()

    if([moneda,criptoMoneda].includes('')){
      setError(true)

      return
    }

    setTimeout(() => {
      setError(false)
    }, 500);
    
    setMonedas({
      moneda,
      criptoMoneda
    })
  }
  
  return (

    <>
      {error && <Error>Todos los campos son obligatorios</Error>}

      <form
        onSubmit={handleSubmit}
      >
        <SelectMonedas/>
        <SelectCriptoMoneda/>
        
        <InputSubmit
              type='submit'
              value='cotizar'
        />
      </form>
    </>
  )
}

export default Formulario