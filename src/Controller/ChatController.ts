
import { Request, Response } from 'express';


class ChatController {

    formulario(req: Request, res: Response) {
        return res.render('index', { data: null });
    }

    processar(req: Request, res: Response) {
        return res.render('index', {})
    }


}

export default new ChatController();

