import './App.scss'
import { useState } from 'react'

export default function Timeline() {

  const
    [completed, setCompleted] = useState(false),
    [currentStep, setStep] = useState(3),

    [labelAlign, setAlign] = useState('labels-between'),
    [labelUpDown, setUpDown] = useState('labels-down'),

    [labels, setLabels] = useState([
      'Step 1',
      'Step 2',
      'Step 3',
      'Step 4'
    ])

  return (
    <div className="container">
      <div className="greeting">
        <p>Hey!</p>
        <p>Timeline is {
          !completed ? <span className="marker">in progress</span> : ''
        } {
          (currentStep === 0) ? 'not begun yet' : `on Step ${currentStep}`
        }.</p>
      </div>
      <Stepper
        labels={labels}
        setStep={setStep}
        completed={completed}
        currentStep={currentStep}
        setCompleted={setCompleted}
        labelUpDown={labelUpDown}
        labelAlign={labelAlign}
      />
      <Controls
        setCompleted={setCompleted}
        currentStep={currentStep}
        labelUpDown={labelUpDown}
        labelAlign={labelAlign}
        setUpDown={setUpDown}
        completed={completed}
        setLabels={setLabels}
        setAlign={setAlign}
        setStep={setStep}
        labels={labels}
      />
    </div>
  )

}

const Stepper = ({ labels, setStep, currentStep, completed, setCompleted, labelUpDown, labelAlign }) => {
  return (
    <div className={`stepper ${labelUpDown} ${labelAlign}`}>
      {labels.map((label, i) => (
        <Step
          selected={currentStep === i + 1}
          setCompleted={setCompleted}
          currentStep={currentStep}
          completed={completed}
          setStep={setStep}
          label={label}
          key={i.toString()}
          i={i}
        />
      ))}
    </div>
  )
}

const Step = ({ label, i, setStep, selected, currentStep, completed, setCompleted }) => {

  // Switching Step
  function updateStep(i, completed, selected) {
    if(!selected){
      setStep(++i)
      setCompleted(false)
    } else if(selected && !completed){
      setCompleted(true)
    } else {
      setStep(i)
    }
  }

  return (
    <div className={(
      'step-wrapper' +
      ((selected && !completed) ? ' selected' : '') +
      ((selected && completed) ? ' completed' : '') +
      (currentStep > i + 1 ? ' passed' : '')
    )}>
      <div onClick={() => updateStep(i, completed, selected)} className="dot"></div>
      <div className="label"><span>{label}</span></div>
    </div>
  )
}

const Controls = ( props ) => {

  // Current Step for short
  let current = props.currentStep

  // Timeline limit
  const maxStep = 100

  // Add Step
  const addStep = () => {
    if(props.labels.length < maxStep){
      props.setLabels([...props.labels, `Step ${++props.labels.length}`])
    }
  }

  // Remove Step
  const removeStep = () => {
    if(props.labels.length > 1){
      props.setLabels(props.labels.slice(0,-1))

      // Correct Current Step
      if((props.labels.length <= current) && !props.completed){
        props.setStep(--current)
        props.setCompleted(true)
      } else if(props.labels.length <= current){
        props.setStep(--current)
      }
    }
  }

  // Shifting Step
  function stepShift(value) {
    if((current === 0) && !value){
      console.log('Limit by Prev')
    } else if((current >= props.labels.length) && props.completed && value){
      console.log('Limit by Next')
    } else {
      if(props.completed && !value){
        props.setCompleted(false)
      } else if(!props.completed && !value){
        --current
        props.setStep(current)
        props.setCompleted(true)
      } else if(props.completed && value){
        ++current
        props.setStep(current)
        props.setCompleted(false)
      } else {
        props.setCompleted(true)
      }
    }
  }

  return (
    <div className="controls">

      <div className="timeline-appearance">
        <h3>Labels:</h3>
        <div>
          <div>
            <input
              type="radio"
              id="labels-up"
              name="labels-updown"
              value="labels-up"
              checked={props.labelUpDown === 'labels-up'}
              onChange={(e) => props.setUpDown(e.target.value)}
            />
            <label className="radio" htmlFor="labels-up"><span>Up</span></label>
            <input
              type="radio"
              id="labels-down"
              name="labels-updown"
              value="labels-down"
              checked={props.labelUpDown === 'labels-down'}
              onChange={(e) => props.setUpDown(e.target.value)}
              />
            <label className="radio" htmlFor="labels-down"><span>Down</span></label>
          </div>
          <hr className="divider-vertical"/>
          <div>
            <input
              type="radio"
              id="labels-between"
              name="labels-align"
              value="labels-between"
              checked={props.labelAlign === 'labels-between'}
              onChange={(e) => props.setAlign(e.target.value)}
            />
            <label className="radio" htmlFor="labels-between"><span>Between steps</span></label>
            <input
              type="radio"
              id="labels-nearby"
              name="labels-align"
              value="labels-nearby"
              checked={props.labelAlign === 'labels-nearby'}
              onChange={(e) => props.setAlign(e.target.value)}
            />
            <label className="radio" htmlFor="labels-nearby"><span>Near step</span></label>
          </div>
        </div>
      </div>

      <div className="timeline-steps">
        <h3>Steps:</h3>
        <div className="btn-wrap">
          <button
            className={'btn' + ((current === 0) ? ' btn-disabled' : '' )}
            onClick={() => stepShift(false)}>
            <span>Prev.</span>
          </button>
          <button
            className={'btn' + ((props.completed && current === props.labels.length) ? ' btn-disabled' : '')}
            onClick={() => stepShift(true)}>
            <span>Next</span>
          </button>
        </div>
        <hr className="divider-horizontal" />
        <div className="btn-wrap">
          <button
            className={'btn' + ((props.labels.length <= 1) ? ' btn-disabled' : '' )}
            onClick={removeStep}>
            <span>Remove</span>
          </button>
          <button
            className={'btn' + ((props.labels.length >= maxStep) ? ' btn-disabled' : '' )}
            onClick={addStep}>
            <span>Add</span>
          </button>
        </div>
      </div>

    </div>
  )
}
