import {
  Injector,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  Renderer,
  NgZone,
  KeyValueDiffers,
  IterableDiffers,
  DefaultIterableDiffer,
  Output
} from '@angular/core';
import { FormControlName, NG_VALUE_ACCESSOR } from '@angular/forms';

<%# directiveArray collects all directives. -%>
<% const directiveArray = []; -%>

<% if(propertiesWithNotify.length > 0) { -%> 
<%- include('directives/change-events-adapter'); -%>
<% directiveArray.push(nameCamelCase + "ChangeEventsAdapterDirective") %>
<% } -%>

<% if(arrayAndObjectProperties.length > 0) { %>
<%- include('directives/notify-for-differs'); -%>
<% directiveArray.push(nameCamelCase + "NotifyForDiffersDirective") %>
<% } %>

<% if (isFormElement) { %>
<%- include('directives/validation'); %> 
<% directiveArray.push(nameCamelCase + "ValidationDirective") %>
<%- include('directives/form-element'); -%> 
<% directiveArray.push(nameCamelCase + "FormElementDirective") %>
<% } %>

<% if (reloadConfiguration) { %>
<%- include('directives/reload-configuration'); -%>
<% directiveArray.push(nameCamelCase + "ReloadConfigurationDirective") %>
<% } %>

export const <%= nameCamelCase %> = [
  <%- directiveArray.join(',\n  ').replace(/\"/g, "") %>
];