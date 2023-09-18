import express, {Response, Request} from 'express';
import { PrismaClient, Prisma } from '@prisma/client';
import moment from 'moment';

const app = express();
app.use(express.json())


const prisma = new PrismaClient()








app.get('/alltools', async (req: Request, res: Response) => {
    try {
        const ferramentas = await prisma.tool.findMany();
        res.json({ ferramentas });
      } catch (error) {
        console.error('Erro ao buscar ferramentas:', error);
        res.status(500).json({ erro: 'Ocorreu um erro ao buscar as ferramentas' });
      }
});

app.get('/getid/:id', async (req: Request, res: Response)=>{
    try {
        const { id } = req.params;
        const ferramentas = await prisma.tool.findUnique({
            where: {
                id : parseInt(id),
            },
        });
        
        if (!ferramentas) {
            res.status(404).json({ erro: 'Ferramenta não encontrada' });
          } else {
            res.json({ ferramentas });
        }
    } catch(error){
        console.error('Erro ao buscar ferramenta por ID:', error);
        res.status(500).json({ erro: 'Ocorreu um erro ao buscar a ferramenta' });
    }
})

app.post('/cadastra', async (req: Request, res: Response) =>{
    try {
        const { nome, descricao, status, coletaEm, devolucaoEm, mecanico } = req.body;

        const coletaEmISO = moment(coletaEm, 'DD-MM-YYYY HH:mm:ss').toISOString();

        const devolucaoEmDB = devolucaoEm ? moment(devolucaoEm, 'DD-MM-YYYY HH:mm:ss').toISOString() : null;

        const novaFerramenta = await prisma.tool.create({
        data: {
            nome,
            descricao,
            status,
            coletaEm : coletaEmISO,
            devolucaoEm : devolucaoEmDB,
            mecanico,
        },
        });

        res.json({ mensagem: 'Ferramenta criada com sucesso', ferramenta: novaFerramenta });
    } catch (error) {
        console.error('Erro ao criar ferramenta:', error);
        res.status(500).json({ erro: 'Ocorreu um erro ao criar a ferramenta' });
    }
})


app.put('/tools/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { novoStatus } = req.body; 
        
      
      const ferramentaAtualizada = await prisma.tool.update({
        where: {
          id: parseInt(id), 
        },
        data: {
          status: novoStatus,
        },
      });
  
      if (!ferramentaAtualizada) {
        res.status(404).json({ erro: 'Ferramenta não encontrada' });
      } else {
        res.json({ mensagem: 'Status da ferramenta atualizado com sucesso', ferramenta: ferramentaAtualizada });
      }
    } catch (error) {
      console.error('Erro ao atualizar status da ferramenta por ID:', error);
      res.status(500).json({ erro: 'Ocorreu um erro ao atualizar o status da ferramenta' });
    }
});

app.delete('/tools/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      
      const ferramentaDeletada = await prisma.tool.delete({
        where: {
          id: parseInt(id), 
        },
      });
  
      if (!ferramentaDeletada) {
        res.status(404).json({ erro: 'Ferramenta não encontrada' });
      } else {
        res.json({ mensagem: 'Ferramenta deletada com sucesso' });
      }
    } catch (error) {
      console.error('Erro ao excluir ferramenta por ID:', error);
      res.status(500).json({ erro: 'Ocorreu um erro ao excluir a ferramenta' });
    }
  });

  app.post('/tools/reservar/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { mecanico } = req.body; // Nome do mecânico fornecido no corpo da solicitação
  
      console.log('ID da ferramenta:', id);
      console.log('Mecânico:', mecanico);
  
      // Use o Prisma para atualizar o campo "mecanico" da ferramenta com base no ID
      const ferramentaReservada = await prisma.tool.update({
        where: {
          id: parseInt(id), // Certifique-se de converter o ID para um número
        },
        data: {
          mecanico,
        },
      });
  
      console.log('Ferramenta reservada:', ferramentaReservada);
  
      if (!ferramentaReservada) {
        res.status(404).json({ erro: 'Ferramenta não encontrada' });
      } else {
        res.json({ mensagem: 'Ferramenta reservada com sucesso', ferramenta: ferramentaReservada });
      }
    } catch (error) {
      console.error('Erro ao reservar ferramenta por ID:', error);
      res.status(500).json({ erro: 'Ocorreu um erro ao reservar a ferramenta' });
    }
  });










export default app;