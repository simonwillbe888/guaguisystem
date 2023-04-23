import request from '@/utils/request'

// 云台设置
export function startPanLeft (speed,id) {
  return request({
    url: '/api/HKControl/StartPanLeft?dwSpeed=' + speed + '&accessoryID=' + id,
    method: 'get'
  })
}

export function endPanLeft (id) {
  return request({
    url: '/api/HKControl/EndPanLeft?accessoryID=' + id,
    method: 'get'
  })
}

export function startPanRight (speed,id) {
  return request({
    url: '/api/HKControl/StartPanRight?dwSpeed=' + speed  + '&accessoryID=' + id,
    method: 'get'
  })
}

export function endPanRight (id) {
  return request({
    url: '/api/HKControl/EndPanRight?accessoryID=' + id,
    method: 'get'
  })
}

export function startTiltUp (speed,id) {
  return request({
    url: '/api/HKControl/StartTiltUp?dwSpeed=' + speed + '&accessoryID=' + id,
    method: 'get'
  })
}

export function endTiltUp (id) {
  return request({
    url: '/api/HKControl/EndTiltUp?accessoryID=' + id,
    method: 'get'
  })
}

export function startTiltDown (speed,id) {
  return request({
    url: '/api/HKControl/StartTiltDown?dwSpeed=' + speed + '&accessoryID=' + id,
    method: 'get'
  })
}

export function endTiltDown (data) {
  return request({
    url: '/api/HKControl/EndTiltDown?accessoryID=' + data,
    method: 'get'
  })
}
export function StartZoomIn (speed,id) {
  return request({
    url: '/api/HKControl/StartZoomIn?dwSpeed=' + speed + '&accessoryID=' + id,
    method: 'get'
  })
}
export function EndZoomIn (id) {
  return request({
    url: '/api/HKControl/EndZoomIn?accessoryID=' + id,
    method: 'get'
  })
}
export function StartZoomOut (speed,id) {
  return request({
    url: '/api/HKControl/StartZoomOut?dwSpeed=' + speed + '&accessoryID=' + id,
    method: 'get'
  })
}
export function EndZoomOut (id) {
  return request({
    url: '/api/HKControl/EndZoomOut?accessoryID=' + id,
    method: 'get'
  })
}
export function StartIrisOpen (speed,id) {
  return request({
    url: '/api/HKControl/StartIrisOpen?dwSpeed=' + speed + '&accessoryID=' + id,
    method: 'get'
  })
}
export function EndIrisOpen (id) {
  return request({
    url: '/api/HKControl/EndIrisOpen?accessoryID=' + id,
    method: 'get'
  })
}
export function StartIrisClose (speed,id) {
  return request({
    url: '/api/HKControl/StartIrisClose?dwSpeed=' + speed + '&accessoryID=' + id,
    method: 'get'
  })
}

export function EndIrisClose (id) {
  return request({
    url: '/api/HKControl/EndIrisClose?accessoryID=' + id,
    method: 'get'
  })
}

export function StartFocusNear (speed,id) {
  return request({
    url: '/api/HKControl/StartFocusNear?dwSpeed=' + speed + '&accessoryID=' + id,
    method: 'get'
  })
}
export function EndFocusNear (id) {
  return request({
    url: '/api/HKControl/EndFocusNear?accessoryID=' + id,
    method: 'get'
  })
}
export function StartFocusFar (speed,id) {
  return request({
    url: '/api/HKControl/StartFocusFar?dwSpeed=' + speed + '&accessoryID=' + id,
    method: 'get'
  })
}
export function EndFocusFar (id) {
  return request({
    url: '/api/HKControl/EndFocusFar?accessoryID=' + id,
    method: 'get'
  })
}
export function StartWiper(speed,id){
  return request({
    url:'/api/HKControl/StartWiper?dwSpeed='+ speed + '&accessoryID=' + id,
    method:'get',
    data:{},
  })
}
export function EndWiper(id){
  return request({
    url:'/api/HKControl/EndWiper?accessoryID=' + id,
    method:'get',
    data:{},
  })
}
export function StartLight(speed,id){
  return request({
    url:'/api/HKControl/StartLight?dwSpeed='+speed + '&accessoryID=' + id,
    method:'get',
    data:{},
  })
}


export function EndLight(id){
  return request({
    url:'/api/HKControl/EndLight?accessoryID=' + id,
    method:'get',
    data:{},
  })
}
export function login (data) {
  return request({
    url: '/api/HKControl/Login',
    method: 'post',
    data
  })
}

export function startRecord (id) {
  return request({
    url: '/api/HKControl/StartRecord?accessoryID=' + id,
    method: 'get'
  })
}

export function endRecord (id) {
  return request({
    url: '/api/HKControl/EndRecord?accessoryID=' + id,
    method: 'get'
  })
}

export function takePhoto (id) {
  return request({
    url: '/api/HKControl/TakePhoto?accessoryID=' + id,
    method: 'get'
  })
}

export function talkTest (name) {
  return request({
    url: '/api/HKControl/talkTest?userName='+ name+ '&accessoryID=' + id,
    method: 'post',
    data:{},
  })
}


export function setZ (z) {
  return request({
    url: '/api/HKControl/SetZ',
    method: 'get',
    params: {
      z
    }
  })
}

export function StartVoiceTalk(id){
  return request({
    url:'/api/HKControl/StartVoiceTalk?accessoryID=' + id,
    method:'get',
    data:{},
  })
}

export function StopVoiceTalk(id){
  return request({
    url:'/api/HKControl/StopVoiceTalk?accessoryID=' + id,
    method:'get',
    data:{},
  })
}


