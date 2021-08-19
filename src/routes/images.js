import _ from 'lodash'
import { Router } from 'express'
import { baseURL } from '../config'
import uploadMiddleware from '../middleware/uploadMiddleware'

const router = Router()

router.post('/single-upload', uploadMiddleware.single('file'), async(req, res) => {
  let imagePath = req.file.path.replace("public", baseURL)
  imagePath = imagePath.split('src')[1].substring(1, imagePath.length)
  return res.json({
    imagePath
  })
})

router.post('/multi-upload', uploadMiddleware.array('files'), async(req, res) => {
  let { files } = req
  let resp = []
  files.forEach((file) => {
    let imagePath = file.path.replace("public", baseURL)
    imagePath = imagePath.split('src')[1].substring(1, imagePath.length)
    resp.push(imagePath)
  })
  return res.json(resp)
})

export default router