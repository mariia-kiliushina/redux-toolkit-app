import styles from './bakeryStore.css'
import { useSelector, useDispatch } from 'react-redux'
import { sellCake, bakeCakes, fetchQuote } from './counterSimpleReducer'

const BakeryStore = () => {
  const {
    cakesLeftTotal,
    cakesLeftChoco,
    cakesLeftVanilla,
    cakesLeftPeanut,
    error,
    quote,
    loading,
  } = useSelector((state) => state.counterReducer)
  const dispatch = useDispatch()
  return (
    <div className="container">
      <h1>
        Cakes left in total: <span>{cakesLeftTotal}</span>
      </h1>
      <h2>Cakes toppings: </h2>
      <ul className="list-container">
        <li>
          Chocolate
          <button onClick={() => dispatch(sellCake('Choco'))} className={styles.buyButton}>
            Buy Chocolate cake
          </button>
          <div>{cakesLeftChoco}</div>
        </li>
        <li>
          Vanilla cream{' '}
          <button onClick={() => dispatch(sellCake('Vanilla'))} className={styles.buyButton}>
            Buy Vanilla cream cake
          </button>
          <div>{cakesLeftVanilla}</div>
        </li>
        <li>
          Peanut butter{' '}
          <button onClick={() => dispatch(sellCake('Peanut'))} className={styles.buyButton}>
            Buy Peanut butter cake
          </button>
          <div>{cakesLeftPeanut}</div>
        </li>
      </ul>
      <button onClick={() => dispatch(fetchQuote(Math.floor(Math.random() * 29 + 1)))}>
        Get some thoughts to read while eating
      </button>
      {loading && (
        <img
          alt=""
          height="80px"
          width="80px"
          src="https://mir-s3-cdn-cf.behance.net/project_modules/max_632/04de2e31234507.564a1d23645bf.gif"
        />
      )}
      {!loading && quote && (
        <>
          <h3>{quote}</h3>
        </>
      )}
      {error && (
        <>
          <h3>{error}</h3>
          <button onClick={() => dispatch(bakeCakes())} className={styles.buyButton}>
            Bake new portion of cakes!
          </button>
        </>
      )}
    </div>
  )
}

export default BakeryStore
