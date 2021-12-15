import logo from '../img/ledel_logo.svg'
import arrow from '../img/arrow.svg'
import close from '../img/close.svg'
import AwesomeSlider from 'react-awesome-slider'

export type PopUpProps = {
  title: string
  description?: string,
  video?: string,
  slides?: string[],
  link: string,
  close?: () => void
}

export function PopUp(props: PopUpProps) {

  return (
    <div className="popup">
      <div className="name"><h2 className="name-text">{props.title}</h2></div>
      <button className="hide-btn" style={{ cursor: 'pointer' }} onClick={props.close}><img src={close} alt="close" /></button>

      {props.description &&
        <div className="info">
          <h2>Описание</h2>
          <p>{props.description}</p>
        </div>
      }

      {props.video &&
        <div className="video">
          <h2>Видео</h2>
            {props.video.includes('youtube')
            ?<iframe style={{ height: '100%', width: '100%' }} src={props.video} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            :<video src={props.video} className="video-player" controls></video>
          }
        </div>
      }

     

      {props.slides &&
        <div className="slider">
           <AwesomeSlider>
            {
              props.slides.map((slide) => {
                if (slide.includes('youtube'))
                  return (<div><iframe height='300px' width='500px' src={slide} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div>)
                return (<div data-src={slide}></div>)
              })
            }
          </AwesomeSlider>
        </div>
      }


      <div className="footer">
        <div className="logo">
          <img src={logo} alt="Ledel Logo"  />
        </div>
        <div className="linkToBig">
          <span>Перейти на страницу светильника</span>
          <a href={props.link} className="link"  rel="noreferrer noopener" target="_blank">
            <img src={arrow} alt="Arrow" className="arrow" />
          </a>
        </div>
      </div>
    </div>
  )
}