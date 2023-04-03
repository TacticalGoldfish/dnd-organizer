export function unpackDescription(description) {
    let stringArray = description.split('{{');
    let elements = [];
    stringArray.forEach(str => {
      if(!str.includes('}}')) {
        elements.push({
          type: 'span',
          text: str,
        })
      } else {
        const secondSplit = str.split('}}');
        
        if (secondSplit[0].includes('<br />')) {
            elements.push({
              type: 'nl',
            })
            
        } else {
            const aParameters = secondSplit[0].split('|');
            elements.push({
              type: 'a',
              text: aParameters[0],
              module: aParameters[1],
              id: aParameters[2]
            })
        }

        elements.push({
          type: 'span',
          text: secondSplit[1],
        })
      }
    })
    return elements;

}