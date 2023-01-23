import { useState, useRef } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { StyleProvider } from '@ant-design/cssinjs';
import 'antd/dist/reset.css';
import './App.css'
import blueSummonVideo from './assets/videos/blue.mp4'
import purpleSummonVideo from './assets/videos/purple.mp4'
import yellowSummonVideo from './assets/videos/yellow.mp4'

const highRate = { 0: 0.05, 1: 0.25, 2: 0.6, 3: 0.1 }
const lowRate = { 0: 0.4, 1: 0.6, 2: 0, 3: 0 }

function App() {
  const [isRateUp, setIsRateUp] = useState(false)
  const [isOpenBag, setIsOpenBag] = useState(false)
  const [isSummoning, setIsSummoning] = useState(false)
  const [result, setResult] = useState()
  const [isViewResult, setIsViewResult] = useState(false)
  const [isPlayed, setIsPlayed] = useState(false)
  const signRef = useRef(null)

  function weightedRand(spec) {
    var i, sum = 0, r = Math.random();
    for (i in spec) {
      sum += spec[i];
      if (r <= sum) return i;
    }
  }

  const handleBeginSign = () => {
    console.log('Bat dau ve');
  }

  const handleEndSign = () => {
    let rand = weightedRand(isRateUp ? highRate : lowRate)

    console.log(rand);
    let arr = [
      {
        url: blueSummonVideo,
        money: 20,
        rarity: 'low'
      },
      {
        url: purpleSummonVideo,
        money: 50,
        rarity: 'medium'
      },
      {
        url: yellowSummonVideo,
        money: 100,
        rarity: 'high'
      },
      {
        url: yellowSummonVideo,
        money: 200,
        rarity: 'superHigh'
      }
    ]
    console.log('Ve xong r');
    signRef.current.off()
    setIsOpenBag(true)
    setTimeout(() => {
      setIsSummoning(arr[rand].url)
    }, 700);
    setTimeout(() => {
      setIsSummoning(false)
      setIsPlayed(true)
    }, 7000);
    setResult(arr[rand])
  }

  const rollAgain = () => {
    setIsOpenBag(false)
    setIsSummoning(false)
    setResult(null)
    setIsViewResult(false)
    setIsPlayed(false)
  }

  return (
    <StyleProvider hashPriority="high">
      <div className={`app ${isSummoning ? 'summoning' : ''}`}>
        <div className="container">
          <div className={`lucky-bag ${isOpenBag ? 'opening' : ''}`}>
            <h4>LUCKY BAG</h4>
            <div className="wire highrate">

            </div>
            {
              !isSummoning &&
              <div className="sign-container">
                <SignatureCanvas
                  penColor='#deae54'
                  canvasProps={{ width: 230, height: 350, className: 'signCanvas' }}
                  ref={signRef}
                  onBegin={handleBeginSign}
                  onEnd={handleEndSign}
                />
              </div>

            }

            {
              (isPlayed && result) && <div className={`paper ${isViewResult ? '' : 'hide'}`} onClick={() => setIsViewResult(true)}>
                <div className="content">
                  <div className={`money ${result?.rarity}`}>{result?.money}K</div>
                  <button onClick={rollAgain}>Again</button>
                </div>
              </div>
            }
          </div>
          {
            isSummoning && <video className='video-summon' src={isSummoning} autoPlay={true} muted={true} playsInline={true} />
          }
        </div>
      </div>
      <div className={`rateUpToggle ${isRateUp ? 'active' : ''}`} onClick={() => setIsRateUp(!isRateUp)}>
        UP
      </div>
    </StyleProvider>
  )
}

export default App
