import { Howl } from 'howler'

function playSound(sound, targetVolume = 0.5) {
  const playableSound = new Howl({
    src: [sound],
    volume: targetVolume
  })

  playableSound.play()
}

export function playMaximizeSound() {
  playSound('./sounds/maximize.mp3')
}

export function playMinimizeSound() {
  playSound('./sounds/minimize.mp3')
}

export function playClickSound() {
  playSound('./sounds/click.mp3')
}

export function playSelectSound() {
  playSound('./sounds/select.mp3')
}

export function playCardFlipSound() {
  playSound('./sounds/cardflip.mp3')
}

export function playCardWinSound() {
  playSound('./sounds/win.mp3')
}

export function playCardLoseSound() {
  playSound('./sounds/lose.mp3')
}

export function playFanfareSound() {
  playSound('./sounds/fanfare.mp3')
}

export function playHoverSound() {
  playSound('./sounds/hover.mp3', 0.15)
}
