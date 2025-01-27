'use client'

import React, { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import { Button } from "@/components/ui/button"

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export default function QuillEditor() {
    const [content, setContent] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const quillRef = useRef<any>(null)

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await fetch('/api/why-we-exist')
                const data = await response.json()
                setContent(data?.content || getDefaultContent())
            } catch (error) {
                console.error('Error fetching content:', error)
                setContent(getDefaultContent())
            } finally {
                setIsLoading(false)
            }
        }

        fetchContent()
    }, [])

    const saveContent = async () => {
        try {
            setIsLoading(true)
            const response = await fetch('/api/why-we-exist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content }),
            })
            if (response.ok) {
                console.log('Content saved successfully')
            } else {
                console.error('Error saving content')
            }
        } catch (error) {
            console.error('Error saving content:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }],
            ['link', 'image'],
            ['clean']
        ],
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="mb-4 border rounded-lg overflow-hidden">
                <ReactQuill
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    theme="snow"
                />
            </div>
            <div className="flex justify-between items-center mt-4">
                <div>
                    <div className="text-sm text-gray-500">{content.length} characters</div>
                </div>
                <Button
                    disabled={isLoading}
                    onClick={saveContent}
                >
                    {isLoading ? "Saving content..." : "Save Content"}
                </Button>
            </div>
        </div>
    )
}

function getDefaultContent() {
    return `
    <h1>Why We Exist</h1>

    <p>Ever wondered why most brands hide their ingredient list, in microscopic font, at the back? Why you're made to stare, squint eyed, at the crimp, just to figure out what your food is made of?</p>

    <p>As an obese kid trying to eat healthy, I used to ask these questions everyday. I never got an answer, so I did my own research.</p>

    <p>Brands hide what goes into their food, because they have something to hide. Because they'd rather have you drool over fake pictures of molten, drippy chocolate, than have you discover that your food contains artificial sugars and preservatives and other hard-to-pronounce chemicals.</p>

    <p>In the name of 'healthy', we're being sold a bunch of lies. And I was done being lied to. So I, along with a few  like-minded (and equally betrayed) folks, started The Whole Truth.</p>

    <p>Our purpose is simple. We make food so clean, we can proudly declare every single ingredient that goes into it, upfront. And we can speak the whole truth, because we have #nothingtohide.</p>

    <h2>Shashank</h2>
    <p>Founder, CEO. Obese kid. Fit adult. Hell bent on setting packaged food right.</p>

    <h2>Who is this guy?</h2>
    <img src="/placeholder.svg?height=300&width=300" alt="Shashank before" />
    <img src="/placeholder.svg?height=300&width=300" alt="Shashank after" />

    <p>Shashank, our main man, started his fitness journey at over 100kgs, 15 years ago. In the decade that followed, he taught himself fitness, lost 40kgs, ran several marathons, and helped many friends and colleagues get onto the fitness bandwagon.</p>

    <p>After all the years of research and self-experimentation, he believes there's only one universal food truth</p>

    <blockquote>good food is made of good ingredients</blockquote>

    <p>You can access all his learnings at FITSHITin, his free-forever fitness blog read by thousands every week.</p>

    <p>Disclaimer – views on the blog are personal, so is the crusade.</p>

    <p>P.S: It is very strange to write about yourself in third person.</p>
  `
}