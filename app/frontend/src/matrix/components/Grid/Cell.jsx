import React, {
  useState,
  useEffect
} from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames';

const Cell = ({
  subsidiaryProfileId,
  ownerProfileId,
  investors
}) => {
  const { actualVersion } = useSelector(state => state)
  const { firms } = actualVersion.response

  const [percentage, setPercentage] = useState(null)
  const [subsidiary, setSubsidiary] = useState(subsidiaryProfileId)
  const [owner, setOwner] = useState(ownerProfileId)

  useEffect(() => {
    const investor = investors.find(investor => investor.ownerFirmProfileId === owner)
    if (investor) {
      setPercentage(investor.percentage)
    }
  }, [])

  const handleChange = (e) => {
    if (e.target.value === '0') {
      setPercentage('')
    } else {
      setPercentage(e.target.value)
    }
  }

  const setDisabled = () => {
    if (subsidiary === owner) {
      return true
    } else {
      return false
    }
  }

  const cellClasses = classNames('rounded-md w-full h-full border-none focus:outline-TealBlue text-center px-2', {
    'bg-slate-50': subsidiary === owner,
    'bg-white': subsidiary !== owner,
  })

  return (
    <div className="flex h-full w-28 p-2 text-center">
      <input
        className={cellClasses}
        type="number"
        min="0"
        max="100"
        step="1"
        value={percentage}
        onChange={(e) => handleChange(e)}
        disabled={setDisabled()}
      />
    </div>
  )
}

export default Cell