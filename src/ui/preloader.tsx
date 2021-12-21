import loaderImage from '../img/loading.png'


export function Preloader(props: { progress: number, [key: string]: any}) {
  return  (
  <div id="preloader" {...props}>
    <div>
      <img src={loaderImage} alt="Loading" />
      {Math.floor(props.progress)} % loaded
    </div>
  </div>
  )
}