interface PolymerElementData {
  name : string
  propertiesWithNotify ?: Array<String>,
  arrayAndObjectProperties ?: Array<String>,
  isFormElement: Boolean,
  isCheckedElement: Boolean,
  reloadConfiguration?: Boolean
}

// Function that executes directly in the browsers
// Needs to encapsulate all functions directly to execute them inside the browser environment
export function retrieveAndClassifyPolymerElements():Array<PolymerElementData> {
  const Polymer = (<any> window).Polymer;
  const registrations = Polymer.telemetry.registrations;
  const elements:Array<PolymerElementData> = [];
  
  // Declare function to filter the needed properties.
  const getPropertiesByFilterFn = (proto: any, filterFn: any) => {
    const propertyQueue = proto.behaviors
      .filter((behavior:any) => behavior.properties)
      .map((behavior:any) => behavior.properties);
    if (proto.properties) {
      propertyQueue.push(proto.properties);
    }

    return propertyQueue.reduce((allProps:any, properties:any) => {
      let currentProps = Object.getOwnPropertyNames(properties)
        .filter(name => name.indexOf('_') !== 0 && allProps.indexOf(name) < 0)
        .filter(name => {
          var property = properties[name];
          if (typeof property === 'function') {
            property = {type: property};
          }
          return filterFn(property);
        })
      return allProps.concat(currentProps);
    }, []); 
  }
  
  // Parse registrations
  registrations.forEach((element:any) => {
    let proto = Object.getPrototypeOf(document.createElement(element.is));
    let behaviors = proto.behaviors;
    if(proto.is === element.is) {
      let parsedElement:PolymerElementData = {
        name: proto.is,
        isFormElement : false,
        isCheckedElement : false,
        reloadConfiguration : false
      };
      parsedElement.propertiesWithNotify = getPropertiesByFilterFn(proto, info => {
          return info && info.notify;
      })
      parsedElement.arrayAndObjectProperties = getPropertiesByFilterFn(proto, info => {
          return info.type && !info.readOnly && (info.type === Object || info.type === Array);
      });
      parsedElement.isFormElement = (!!(Polymer.IronFormElementBehavior && proto.behaviors
          && proto.behaviors.indexOf(Polymer.IronFormElementBehavior) > -1));
      parsedElement.isCheckedElement = (!!(Polymer.IronCheckedElementBehaviorImpl && proto.behaviors 
          && proto.behaviors.indexOf(Polymer.IronCheckedElementBehaviorImpl) > -1));
      parsedElement.reloadConfiguration = (typeof proto.isInitialized === 'function' 
          && typeof proto.reloadConfiguration === 'function');
      
      elements.push(parsedElement);
    }
  });
  return elements;
}