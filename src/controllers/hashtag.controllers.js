import { getAllHashtagsRep, getSelectedHashtagRep, postHashtagRep1, postHashtagRep2, postHashtagRep3, postHashtagRep4 } from "../repositories/auth.repository.js/hashtag.repository.js";

export async function postHashtag(req, res) {
    const { postId, hashtag } = req.body
    try {
        const existe = await postHashtagRep1(postId, hashtag)
        if (existe.rows[0].count == 0) {
            const existeHash = await postHashtagRep2(hashtag)
            console.log(hashtag)
            console.log(existeHash.rows.length)
            if (existeHash.rows.length == 0) {
                console.log("Aq")
                postHashtagRep3(hashtag)
            }
            postHashtagRep4(postId, hashtag)
        } else {
            return res.sendStatus(400)
        }
        res.sendStatus(200)
    } catch (err) {
        res.status(500).send("Houve um erro ao salvar a hashtag no banco")
    }
}

export async function getAllHashtags(req, res) {
    try {
        const result = await getAllHashtagsRep()
        res.status(200).send(result.rows)
    } catch (err) {
        res.status(500).send("Houve um erro ao pegar as hashtags do banco")
    }
}
export async function getSelectedHashtag(req, res) {
    const { hashtag } = req.params
    try {
        const result = await getSelectedHashtagRep(hashtag)
        res.status(200).send(result.rows)

    } catch (err) {
        res.status(500).send("Houve um erro ao pegar a hashtag informada no banco")
    }
}