<% exportedElements.forEach((element) => { -%>
<%- `import {${element.className}} from "${element.filePath}"` -%>  
<%- `export {${element.className}} from "${element.filePath}"` -%>  
<% }) %>

export const POLYMER_ELEMENTS = [
  <%- exportedElements.map(element => element.className).join(',\n  ') %>
];