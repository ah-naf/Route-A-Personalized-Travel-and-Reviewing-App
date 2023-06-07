import React from 'react'
import { Handle, Position } from 'reactflow'

function StartNode() {
  return (
    <div className='bg-white w-24 h-24 rounded-full grid place-content-center font-primary font-bold tracking-wider text-xl'>
        <Handle type='source' position={Position.Bottom} />
        Start
    </div>
  )
}

export default StartNode