'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronRight, Upload } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import axios from 'axios'

export default function ContactForm() {
    const [showForm, setShowForm] = useState(false)
    const [loading, setLoading] = useState(false)
    const [selectedOption, setSelectedOption] = useState("")
    const [formData, setFormData] = useState({
        orderId: '',
        name: '',
        email: '',
        message: '',
        contactNumber: '',
    })
    const [file, setFile] = useState<File | null>(null)
    const { toast } = useToast()

    const handleOptionClick = (option: string) => {
        setShowForm(true)
        setSelectedOption(option)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prevData => ({ ...prevData, [name]: value }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const formDataToSend = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, value)
        })
        formDataToSend.append('type', selectedOption)
        if (file) {
            formDataToSend.append('file', file)
        }

        try {
            const response = await axios.post('/api/contact', formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })

            if (response.status === 200) {
                toast({
                    title: 'Form submitted successfully!',
                    description: 'Thank you for contacting us.',
                })
                setFormData({
                    orderId: '',
                    name: '',
                    email: '',
                    message: '',
                    contactNumber: '',
                })
                setFile(null)
                setShowForm(false)
            } else {
                throw new Error('Submission failed')
            }
        } catch (error) {
            console.error('Error submitting form:', error)
            toast({
                title: 'Error',
                description: 'An error occurred while submitting the form. Please try again.',
                variant: 'destructive',
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="flex flex-col md:flex-row py-16">
            {/* Left Section: Contact Information */}
            <div className="mx-auto p-6 md:w-1/2">
                <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                <p className="mb-4">
                    If you&apos;re here, you either love us, or we screwed up (usually the
                    latter).
                </p>
                <p className="mb-8">Allow us to make it right. Please!</p>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">Mailing address</h2>
                    <p>FITSHIT Health Solutions Pvt Ltd</p>
                    <p>4th Floor, A Wing, Krislon House,</p>
                    <p>Krishanlal Marwah Rd, Saki Vihar Rd, Andheri East,</p>
                    <p>Mumbai, Maharashtra 400072</p>
                    <p className="mt-4">Phone: +91 73049 90955</p>
                    <p>Email: listen@eat5foods.com</p>
                    <p>Working Hours: (10AM – 7PM IST Monday to Saturday)</p>
                </div>
            </div>

            {/* Right Section: Buttons and Form */}
            <div className="md:w-1/2 p-6">
                <div className="space-y-6">
                    {/* Button Options */}
                    <div className={`space-y-4 ${showForm ? "hidden" : "block"}`}>
                        <button
                            className="w-full flex items-center justify-between p-4 bg-white rounded-lg shadow hover:bg-gray-100"
                            onClick={() => handleOptionClick("Problems")}
                        >
                            <div className="flex items-center">
                                <div className="w-12 h-12 mr-4 bg-gray-200 rounded-full flex items-center justify-center">
                                    📘
                                </div>
                                <div>
                                    <h3 className="font-semibold">
                                        Problems? We&apos;ve got answers
                                    </h3>
                                    <p className="text-sm text-gray-600">Help with your order</p>
                                </div>
                            </div>
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        <button
                            className="w-full flex items-center justify-between p-4 bg-white rounded-lg shadow hover:bg-gray-100"
                            onClick={() => handleOptionClick("Feedback")}
                        >
                            <div className="flex items-center">
                                <div className="w-12 h-12 mr-4 bg-gray-200 rounded-full flex items-center justify-center">
                                    ⭐️
                                </div>
                                <div>
                                    <h3 className="font-semibold">
                                        If you&apos;ve got good things to say
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        we love reading long emails
                                    </p>
                                </div>
                            </div>
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        <button
                            className="w-full flex items-center justify-between p-4 bg-white rounded-lg shadow hover:bg-gray-100"
                            onClick={() => handleOptionClick("Other")}
                        >
                            <div className="flex items-center">
                                <div className="w-12 h-12 mr-4 bg-gray-200 rounded-full flex items-center justify-center">
                                    😎
                                </div>
                                <div>
                                    <h3 className="font-semibold">Reach out to us</h3>
                                    <p className="text-sm text-gray-600">Any other enquiries</p>
                                </div>
                            </div>
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Form Section */}
                    {showForm && (
                        <div className="block">
                            <Button
                                variant="outline"
                                className="mb-6"
                                onClick={() => setShowForm(false)}
                            >
                                GO BACK
                            </Button>

                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div>
                                    <Label htmlFor="orderId">Order ID</Label>
                                    <Input
                                        id="orderId"
                                        name="orderId"
                                        placeholder="Order ID"
                                        value={formData.orderId}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        placeholder="Message"
                                        className="h-32"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="contactNumber">Contact Number</Label>
                                    <Input
                                        id="contactNumber"
                                        name="contactNumber"
                                        placeholder="Contact Number"
                                        value={formData.contactNumber}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="file">Upload a Picture</Label>
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            id="file"
                                            type="file"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => document.getElementById('file')?.click()}
                                            className="w-full justify-start"
                                        >
                                            <Upload className="mr-2 h-4 w-4" />
                                            {file ? file.name : '+ UPLOAD A PICTURE'}
                                        </Button>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-black text-white hover:bg-gray-800"
                                    disabled={loading}
                                >
                                    {loading ? 'Submitting...' : 'SUBMIT'}
                                </Button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}