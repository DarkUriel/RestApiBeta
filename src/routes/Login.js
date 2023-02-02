const { Router } = require('express');
const router = Router();
const jwt = require('../jwt/jwt')
const Login = require('../database/Login')

router.get('/auth', async(req, res)=>{
    if (req.headers['x-access-token']) {
        const token = req.headers['x-access-token']
        console.log(token)
        try {
            const resp = await jwt.VerifyToken(token)
        if (resp !== false) {
            res.json({
                status: true,
                token: resp.token,
                User:  resp.user
            })
        }else{
            res.json({
                status: false,
                message: 'invalid token'
            })
        }
        } catch (error) {
            res.json({
                status: false,
                message: 'fatal error'
            })
        }
    }else{
        res.json({
            auth: false,
            status: 'No token access'
        })
    }
})

router.get('/all', async(req, res) =>{
    res.json({
        message: 'received',
        status: true,
        Users: await Login.GetUsuarios()
    })
})

router.post('/', async(req, res)=>{
    console.log(req.body)
    const login = await Login.GetUsuario(req.body)
    if (login !== null) {
        const token = jwt.GenerateAccessToken(login)
        res.json({
            status: true,
            token,
            data: login
        })
    }else{
        res.json({
            status: false,
            message: 'user not found'
        })
    }
})

router.post('/create', async(req, res)=>{
    const datos = await Login.CreateLogin(req.body)
    if (datos === false) {
        res.json({
            status: false,
            message: 'user exist'
        })
    }else{
        if (datos === null) {
            res.json({
                status: false,
                message: 'Error'
            })
        }else{
            res.json({
                status: true,
                data: datos
            })
        }
    }
})

router.put('/:id', async(req, res)=>{
    const id = req.params.id
    try {
        const datos = await Login.UpdateLogin(id, req.body)
    if (datos.modifiedCount === 0) {
        res.json({
            status: false,
            message: 'Error to update'
        })
    }else{
        res.json({
            status: true,
            message: 'update successfully',
            data: datos
        })
    }
    } catch (error) {
        res.json({
            status: false,
            message: 'Fatal Error'
        })
    }
})

router.delete('/:id', async(req, res)=>{
    const id = req.params.id
    try {
        const datos = await Login.DeleteLogin(id)
    if (datos.deletedCount === 0) {
        res.json({
            status: false,
            message: 'error to delete'
        })
    }else{
        res.json({
            status: true,
            message: 'delete successfully',
            data: datos
        })
    }
    } catch (error) {
        res.json({
            status: false,
            message: 'Fatal Error'
        })
    }
})

router.get('/:id', (req, res) =>{
    const id = req.params.id
    res.json({
        message: id,
        status: 'received'
    })
})


module.exports = router;