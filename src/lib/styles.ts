export function camelToKebab (string: string) {
  return string.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
}

export interface Style {
  _name: string
  primaryColor: string,
  secondaryColor: string,
  tertiaryColor: string,
  quaternaryColor: string,
  background: string,
  textColor: string,
  bombCellColor: string,
  flagColor: string,
  hiddenCellColor: string,
  popUpBackground: string,
  popUpTextColor: string,
  popUpCloseHoverColor: string
}

export const styles = [
  {
    _name: 'Light',
    primaryColor: '27, 153, 139',
    secondaryColor: '27, 153, 139',
    tertiaryColor: '0, 0, 0',
    quaternaryColor: '101, 97, 118',
    background: 'rgba(248, 241, 255, 1)',
    textColor: 'var(--tertiary-color)',
    bombCellColor: 'rgba(153, 27, 72, 0.5)',
    flagColor: 'rgba(30, 30, 30, 1)',
    hiddenCellColor: 'rgba(var(--primary-color), 0.8)',
    popUpBackground: 'var(--flag-color)',
    popUpTextColor: 'var(--background)',
    popUpCloseHoverColor: 'rgb(194, 187, 201)'
  },
  {
    _name: 'Dark',
    primaryColor: '27, 153, 139',
    secondaryColor: '27, 153, 139',
    tertiaryColor: '255, 255, 255',
    quaternaryColor: '101, 97, 118',
    background: 'rgba(13, 12, 21, 1)',
    textColor: 'var(--tertiary-color)',
    bombCellColor: 'rgba(153, 27, 72, 0.5)',
    flagColor: 'rgba(30, 30, 30, 1)',
    hiddenCellColor: 'rgba(var(--primary-color), 0.8)',
    popUpBackground: 'var(--flag-color)',
    popUpTextColor: 'var(--tertiary-color)',
    popUpCloseHoverColor: 'rgb(194, 187, 201)'
  },
  {
    _name: 'Retro',
    primaryColor: '255, 0, 0',
    secondaryColor: '0, 255, 0',
    tertiaryColor: '0, 0, 255',
    quaternaryColor: '255, 255, 0',
    background: 'rgba(0, 0, 0, 1)',
    textColor: 'rgb(255, 255, 255)',
    bombCellColor: 'rgba(var(–primary-color), 0.8)',
    flagColor: 'var(–quaternary-color)',
    hiddenCellColor: 'rgba(var(–secondary-color), 0.8)',
    popUpBackground: 'var(–tertiary-color)',
    popUpTextColor: 'var(–background)',
    popUpCloseHoverColor: 'var(–quaternary-color)'
  },
  {
    _name: 'Ocean',
    primaryColor: '0, 191, 255',
    secondaryColor: '32, 178, 170',
    tertiaryColor: '240, 248, 255',
    quaternaryColor: '135, 206, 235',
    background: 'rgba(var(–primary-color), 1)',
    textColor: 'rgb(0, 0, 0)',
    bombCellColor: 'rgba(255, 69, 0, 0.8)',
    flagColor: 'rgba(255, 215, 0, 1)',
    hiddenCellColor: 'rgba(var(–secondary-color), 0.8)',
    popUpBackground: 'var(–quaternary-color)',
    popUpTextColor: 'var(–tertiary-color)',
    popUpCloseHoverColor: 'var(–flag-color)'
  },
  {
    _name: 'Forest',
    primaryColor: '34, 139, 34',
    secondaryColor: '85, 107, 47',
    tertiaryColor: '245, 245, 220',
    quaternaryColor: '139,69 ,19',
    background: 'rgba(var(–tertiary-color),1)',
    textColor: 'rgb(58,26,6)',
    bombCellColor: 'rgba(178 ,34 ,34 ,0.8)',
    flagColor: 'rgba(255 ,165 ,0 ,1)',
    hiddenCellColor: 'rgba(var(–primary-color),0.8)',
    popUpBackground: 'var(–secondary-color)',
    popUpTextColor: 'var(–tertiary-color)',
    popUpCloseHoverColor: 'var(–flag-color)'
  },
  {
    _name: 'Space',
    primaryColor: '138 ,43 ,226',
    secondaryColor: '75 ,0 ,130',
    tertiaryColor: '255 ,255 ,255',
    quaternaryColor: '148 ,0 ,211',
    background: 'rgba(0 ,0 ,0 ,1)',
    textColor: 'var(–tertiary-color)',
    bombCellColor: 'rgba(255 ,20 ,147 ,0.8)',
    flagColor: 'rgba(50 ,205 ,50 ,1)',
    hiddenCellColor: 'rgba(var(–primary-color),0.8)',
    popUpBackground: 'var(–secondary-color)',
    popUpTextColor: 'var(–tertiary-color)',
    popUpCloseHoverColor: 'var(–flag-color)'
  },
  {
    _name: 'Candy',
    primaryColor: '255 ,105 ,180',
    secondaryColor: '255 ,20 ,147',
    tertiaryColor: '255 ,255 ,255',
    quaternaryColor: '221 ,160 ,221',
    background: 'rgba(var(–tertiary-color),1)',
    textColor: 'rgb(0, 0, 0)',
    bombCellColor: 'rgba(0 ,0 ,0 ,0.8)',
    flagColor: 'rgba(255 ,0 ,0 ,1)',
    hiddenCellColor: 'rgba(var(–primary-color),0.8)',
    popUpBackground: 'var(–quaternary-color)',
    popUpTextColor: 'var(–tertiary-color)',
    popUpCloseHoverColor: 'var(–flag-color)'
  }
]
