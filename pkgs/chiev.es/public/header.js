const sleep = (timeout) => (
  new Promise((r) => setTimeout(r, timeout))
)

const randColor = () => (
  `hsl(
    ${Math.random() * 255},
    ${50 + Math.random() * 50}%,
    ${50 + Math.random() * 20}%
  )`
)

const randomLights = async (letters) => {
  for(const letter of letters) {
    const lights = letter.querySelectorAll('.light circle')
    for(const light of lights) {
      light.style.fill = randColor()
      await sleep(50)
    }
  }
}
const uniformLights = async (letters) => {
  const fill = randColor()
  for(const letter of letters) {
    const lights = letter.querySelectorAll('.light circle')
    for(const light of lights) {
      light.style.fill = fill
      await sleep(50)
    }
  }
}
const randomLetters = async (letters) => {
  for(const letter of letters) {
    const lights = letter.querySelectorAll('.light circle')
    const fill = randColor()
    for(const light of lights) {
      light.style.fill = fill
    }
    await sleep(100)
  }
}
const uniformLetters = async (letters) => {
  const fill = (
    `hsl(
      ${Math.random() * 255},
      ${80 + Math.random() * 20}%,
      ${60 + Math.random() * 20}%
    )`
  )
  for(const letter of letters) {
    const lights = letter.querySelectorAll('.light circle')
    for(const light of lights) {
      light.style.fill = fill
    }
    await sleep(100)
  }
}
const blink = async () => {
  const lights = Array.from(document.querySelectorAll('.light circle'))
  const state = lights.map((light) => light.style.fill)
  for(let i = 1; i <= Math.round(2 + Math.random() * 3); i++) {
    Promise.all(lights.map(async (light) => {
      light.style.fill = 'black'
    }))
    await sleep(100 + 400 * Math.random())
    Promise.all(lights.map(async (light, idx) => {
      light.style.fill = state[idx]
    }))
    await sleep(100 + 400 * Math.random())
  }
}
window.addEventListener('load', async () => {
  const letters = document.querySelectorAll('.letter')
  while(true) {
    const dice = Math.floor(Math.random() * 6) + 1
    switch(dice) {
      case 1: {
        await randomLights(letters)
        break
      }
      case 2: {
        await uniformLights(letters)
        break
      }
      case 3: {
        await randomLetters(letters)
        break
      }
      case 4: {
        await uniformLetters(letters)
        break
      }
      case 5:
      case 6: {
        await blink()
        break
      }
    }
  }
}, false)
