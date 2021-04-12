import React, {useState} from 'react'
import './cards.css'
import Loader from "../../components/loader/loader";
import NoCards from "../../components/noCards/noCards";

function Cards(props) {

    const [searchCommands, setsearchCommands] = useState([]);
    const [isAddOpen, setAddOpen] = useState(false);
    const [isText, setText] = useState(false);
    const [OpenCard, setOpenCard] = useState('');

    const [trigger, setTrigger] = useState("");
    const [photoName, setPhotoName] = useState("Добавьте фото");
    const [answerText, setAnswerText] = useState("");

    const [load, setLoad] = useState(false);

    const clsAddMenu = ['change']
    const clsInputFile = ['label']

    const handlerSearch = async (event) => {
        const formData = new FormData();
        formData.append('text', event.target.value);
        formData.append('vkId', props.vkId);

        const res_2 = await fetch('', {
            method: 'POST',
            body: formData
        })
        const commands = await res_2.json();

        setsearchCommands(commands);
    }

    const handlerAddMenu = () => {
        setAddOpen(!isAddOpen)
    }

    const handlerOn = () => {
        setText(!isText)
        if (isText) {
            document.getElementById("uploadInputFile").value = ""
            setPhotoName('Добавьте фото')
        } else {
            setAnswerText('')
        }
    }

    if (isText) {
        clsAddMenu.push('on')
    } else {
        clsInputFile.push('disabled')
    }

    const handlerAddPhoto = () => {
        setPhotoName(document.getElementById('uploadInputFile').files[0].name)
    }

    const handlerAddTriggerToBot = async event => {
        event.preventDefault()

        const formData = new FormData()

        formData.append('trigger', trigger)
        formData.append('vkId', props.vkId)
        if (!isText) {
            formData.append('answerText', answerText)
        } else {
            formData.append("userFile", document.getElementById('uploadInputFile').files[0])
        }

        setLoad(true)

        const res = await fetch('', {
            method: 'POST',
            body: formData
        })

        props.onCheckToken()
        handlerAddMenu()
        setTrigger('')
        setAnswerText('')
        setPhotoName('Добавьте фото')
        setLoad(false)
    }

    const showCard = idCard => {
        const result = props.commands.find(function (item, index, array) {
            if (item.id === idCard) {
                return true
            }
        });

        const arr = []
        arr.push(result.request)
        arr.push(result.response)
        arr.push(result.type)

        setOpenCard(arr)
    }

    const answer = searchCommands.length > 0 ? searchCommands : props.commands

    const delCard = async (idCard, event) => {
        event.stopPropagation()
        const formData = new FormData();
        formData.append('id', idCard);
        formData.append('vkId', props.vkId);

        const res_2 = await fetch('', {
            method: 'POST',
            body: formData
        })
        props.onCheckToken()
    }

    const showCardComponent = OpenCard !== '' ?
        <>
            <div
                className="test"
                onClick={() => setOpenCard('')}
            >
                <div
                    onClick={event => event.stopPropagation()}
                    className="test_card">
                    <i className="fas fa-times close"
                       onClick={() => setOpenCard('')}
                    />
                    <small>Команда</small>
                    <h2>{OpenCard[0]}</h2>
                    <small>Ответ бота</small>
                    {
                        OpenCard[2] === 'file' ?
                            <img src={OpenCard[1]}/> :
                            <h3>{OpenCard[1]}</h3>
                    }
                </div>
            </div>
        </>
        :
        null

    const addMenu = isAddOpen ? (
        <div className="addMenu">
            <div
                onClick={handlerAddMenu}
                className="close"><i className="fas fa-times"/></div>
            <form onSubmit={handlerAddTriggerToBot}>
                <small>Введите запрос для реакции бота</small>
                <input
                    placeholder="Введите ваше сообщение..."
                    name="trigger"
                    type="text"
                    autoComplete="off"
                    className="trigger"
                    required
                    onChange={event => setTrigger(event.target.value)}
                />
                <div
                    onClick={handlerOn}
                    className={clsAddMenu.join(' ')}>
                    <i className="fas fa-align-left"/>
                    <div/>
                    <i className="fas fa-image"/>
                </div>
                <textarea
                    disabled={isText}
                    required={!isText}
                    value={answerText}
                    onChange={event => setAnswerText(event.target.value)}
                    placeholder="Введите ответ бота..."
                />

                <div className="addPhoto">
                    <div className="form-group">
                        <label
                            className={clsInputFile.join(' ')}>
                            <i className="material-icons">attach_file</i>
                            <span className="title">{photoName}</span>
                            {
                                photoName === 'Добавьте фото' ?
                                    <small>.jpg .png</small> :
                                    null
                            }
                            <input
                                id="uploadInputFile"
                                name="file"
                                onChange={handlerAddPhoto}
                                accept=".png, .jpg, .jpeg"
                                type="file" disabled={!isText} required={isText}/>
                        </label>
                    </div>
                </div>
                <button className="save">Сохранить</button>
            </form>
        </div>
    ) : null

    return (
        <div className="cards">
            <form onSubmit={event => event.preventDefault()}>
                <input
                    onChange={handlerSearch}
                    placeholder="Поиск карты..."
                    name="card"
                    type="text"
                    autoComplete="off"
                />
                <button><i className="fas fa-search"/></button>
                <button
                    onClick={handlerAddMenu}
                    className="add"><i className="fas fa-plus"/></button>
            </form>
            <div className="grid-container">
                {
                    answer.map(item => {
                        return (
                            <div
                                onClick={() => showCard(item.id)}
                                key={item.id}
                                className="grid-item">
                                <i
                                    title="Удалить"
                                    onClick={event => delCard(item.id, event)}
                                    className="far fa-trash-alt"/>
                                <small>Команда</small>
                                <h2>{item.request}</h2>
                                <small>Реакция бота</small>
                                {
                                    item.type === 'file' ?
                                        <div className="ImgContainer"><img className="userImg" src={item.response}/>
                                        </div> :
                                        <div className="ImgContainer"><p>{item.response}</p></div>
                                }
                            </div>
                        )
                    })
                }
                {load ? <div className="loadContainer"><Loader/></div> : addMenu}
                {showCardComponent}
                {answer.length === 0 ? <NoCards/> : null}
            </div>
        </div>
    )
}

export default Cards;