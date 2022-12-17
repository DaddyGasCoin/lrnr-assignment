import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from 'antd';


function NodeContent({ id }) {
    const [value, setValue] = useState('');

    useEffect(() => {

        //Sets value of editor if node already has data
        if (id) {
            const data = localStorage.getItem(id)
            if (!data) {
                localStorage.setItem(id, '')
                setValue('')
            }
            else {
                setValue(data)
            }
        }
    }, [id])

    const savePost = (data) => {
        localStorage.setItem(id, data)
        setValue('')
    }

    const quillRef = useRef(null);
    return (
        <div className="" style={{
            width: "100%",
            height: "100%"
        }}>
            <ReactQuill theme="snow" value={value} onChange={setValue}
                ref={quillRef}
                style={{
                    overflow: "auto",
                    maxHeight: "500px"
                }}
                modules={
                    {
                        toolbar: [
                            [{ 'size': ['small', false, 'large', 'huge'] }],
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }]
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'code-block'],
                            [{ 'header': 1 }, { 'header': 2 }],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            [{ 'indent': '-1' }, { 'indent': '+1' }],
                            [{ 'direction': 'rtl' }],
                            [{ 'color': [] }, { 'background': [] }],
                            [{ 'font': [] }],
                            [{ 'align': [] }],
                            ['clean']
                        ],
                    }
                }
            />
            <Button onClick={() => savePost(value)} type="primary" htmlType="submit">
                Submit
            </Button>
        </div>
    )
}

export default NodeContent