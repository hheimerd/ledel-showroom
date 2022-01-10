import logo from '../img/ledel_logo.svg'
import arrow from '../img/arrow.svg'
import close from '../img/close.svg'
import AwesomeSlider from 'react-awesome-slider'
import ClickAwayListener from '@mui/base/ClickAwayListener/ClickAwayListener'

export type PopUpProps = {
  title: string
  description?: string,
  videos?: string[],
  slides?: { href?: string, src: string }[],
  link: string,
  close?: () => void
}

export function PopUp(props: PopUpProps) {

  return (
    <ClickAwayListener onClickAway={props.close as any} >
    <div className="popup">
      <button className="hide-btn" style={{ cursor: 'pointer' }} onClick={props.close}><img src={close} alt="close" /></button>
      <div className="name"><h2 className="name-text">{props.title}</h2></div>

      {props.description &&
        <div className="info">
          <h2>Описание</h2>
          <p dangerouslySetInnerHTML={{__html:props.description}}></p>
        </div>
      }

      {props.videos &&
        <div className="video">
          <h2>Видео</h2>
          <AwesomeSlider>
              {
                props.videos.map((src) => (
                  <div className="slider-video-wrapper" key={src}>
                    {
                      src.includes('youtube')
                        ? <iframe className="slider-video" src={src} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        : <video src={src} className="slider-video" controls></video>
                    }
                  </div>
                ))
              }
            </AwesomeSlider>
          {
          }
        </div>
        
      }

      {props.slides && props.slides.length > 0 &&
        <div className="projects">
          <h2>Проекты</h2>
          <div className="slider">
            <AwesomeSlider>
              {
                props.slides.map((slide) => {
                  if (slide.src.includes('youtube'))
                    return (<div key={slide.src} className="slider-video-wrapper"><iframe className="slider-video" src={slide.src} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div>)
                  return (<div 
                    key={slide.src} 
                    data-src={slide.src} 
                    onClick={() => {window.open(slide.href, '_blank')}}></div>)
                })
              }
            </AwesomeSlider>
          </div>
        </div>
      }


      <div className="footer">
        <div className="logo">
          <img src={logo} alt="Ledel Logo" />
        </div>
        <div className="linkToBig">
          <span>Перейти на страницу светильника</span>
          <a href={props.link} className="link" rel="noreferrer noopener" target="_blank">
            <img src={arrow} alt="Arrow" className="arrow" />
          </a>
        </div>
      </div>
    </div>
    </ClickAwayListener>
  )
}