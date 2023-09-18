import swaggerJsdoc from 'swagger-jsdoc';


const options = {
    swaggerDefinition: {
        openapi: '3.0.0', // Especifique a versão do OpenAPI
        info: {
          title: 'API de Exemplo',
          version: '1.0.0',
          description: 'Documentação da API de Exemplo',
        },
        servers: [
          {
            url: 'http://localhost:5050', // Substitua pela URL da sua aplicação
            description: 'Servidor de Desenvolvimento',
          },
        ],
      },
      apis: ['**/*.ts'],
}

const swaggerSpec = swaggerJsdoc(options)

export default swaggerSpec;