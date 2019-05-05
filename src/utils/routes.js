export const buildRoute = (path, variables) => {
  const pathParts = path.split('/')
  const dynamicParts = pathParts.filter(part => part.match(/^:/))

  return dynamicParts.reduce((path, dynamicPart) => (
    path.replace(dynamicPart, variables[dynamicPart.slice(1)] || dynamicPart)
  ), path)
}
