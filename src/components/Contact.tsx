'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send, Clock, Users } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccessMsg(null)
    setErrorMsg(null)

    try {
      // 1) Try Web3Forms first (email + optional SMS if configured in their dashboard)
      const w3Res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: '8c83294e-a18b-42ad-94c7-190998c38235',
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Contact Form',
          message: formData.message,
          from_name: 'E-Cell Website',
          botcheck: false,
        }),
      })
      const w3Json = await w3Res.json()

      if (w3Res.ok && (w3Json?.success === true || w3Json?.message)) {
        console.log('[CONTACT] Web3Forms success', w3Json)
        setSuccessMsg("Message sent successfully. We'll get back to you soon.")
      } else {
        console.warn('[CONTACT] Web3Forms failed, falling back to internal API', w3Json)
        // 2) Fallback to internal API (email/SMS via server)
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        const data = await res.json()
        if (!res.ok) {
          throw new Error(data?.error || 'Failed to send message')
        }
        const emailOk = data?.results?.email?.success === true
        const smsOk = data?.results?.sms?.success === true
        const persisted = data?.persisted === true
        const ok = data?.ok === true || emailOk || smsOk || persisted
        console.log('[CONTACT] API result', data)
        if (ok) {
          setSuccessMsg("Message sent successfully. We'll get back to you soon.")
        } else {
          setErrorMsg('We could not send your message at the moment. Please try again later.')
        }
      }
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-10 px-4">
      
      {/* Animated header */}
      <section className="relative py-10">
        {/* Animated gradient background */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'linear-gradient(135deg, rgba(139,92,246,0.7), rgba(236,72,153,0.7))', backgroundSize: '300% 300%' }}
          animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />
        {/* Particles (reduced for performance) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: Math.random() * 8 + 4,
                height: Math.random() * 8 + 4,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: 'blur(0.5px)'
              }}
              animate={{ y: [0, -60], x: [0, (Math.random() - 0.5) * 60], opacity: [0.2, 0.7, 0] }}
              transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3, ease: 'linear' }}
            />
          ))}
        </div>
        <div className="relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 drop-shadow-[0_0_20px_rgba(168,85,247,0.25)]">Contact</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Have questions about E-Cell or want to collaborate? We're here to help!
            </p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {successMsg && (
              <div className="w-full rounded-lg border border-emerald-400/30 bg-emerald-500/10 text-emerald-200 px-4 py-3">
                {successMsg}
              </div>
            )}
            {errorMsg && (
              <div className="w-full rounded-lg border border-rose-400/30 bg-rose-500/10 text-rose-200 px-4 py-3">
                {errorMsg}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                Subject *
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
              >
                <option className="bg-gray-900" value="">Select a subject</option>
                <option className="bg-gray-900" value="membership-inquiry">Membership Inquiry</option>
                <option className="bg-gray-900" value="collaboration">Collaboration Opportunity</option>
                <option className="bg-gray-900" value="mentorship">Mentorship Request</option>
                <option className="bg-gray-900" value="technical-support">Technical Support</option>
                <option className="bg-gray-900" value="feedback">Feedback</option>
                <option className="bg-gray-900" value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                placeholder="Enter your message..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all ${
                loading
                  ? 'bg-white/20 text-gray-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg'
              }`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          {/* Contact Details */}
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="p-2 bg-white/10 rounded-lg mr-4 border border-white/10">
                  <Mail className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Email</h3>
                  <p className="text-gray-300">crewunited.ecellpec@gmail.com
                    <br />
                    shiva.cloudray0303@gmail.com
                    <br />
                    professorrohithkumar@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-2 bg-white/10 rounded-lg mr-4 border border-white/10">
                  <Phone className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Phone</h3>
                  <p className="text-gray-300">+91 7266990591
                    <br />
                    +91 8121531260
                  </p>
                 
                </div>
              </div>

              <div className="flex items-start">
                  <div className="p-2 bg-white/10 rounded-lg mr-4 border border-white/10">
                  <MapPin className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Address</h3>
                  <p className="text-gray-300">
                    Pallavi Engineering college<br />
                    College Campus<br />
                    Hyderabad, Telangana - 501505
                  </p>
                </div>
              </div>
            </div>
          </div>

          
          {/* Quick Help */}
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Quick Help</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-white mb-2">Want to join our team?</h3>
                <p className="text-gray-300 text-sm">
                  Check our Directory section for open positions or contact us about membership opportunities.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Looking for collaboration?</h3>
                <p className="text-gray-300 text-sm">
                  Reach out to discuss potential partnerships, event collaborations, or mentorship programs.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Need technical support?</h3>
                <p className="text-gray-300 text-sm">
                  Describe the issue you're facing with our website or member portal and we'll help you out.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-300">Quick answers to common questions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
            <h3 className="text-lg font-semibold text-white mb-3">How can I join E-Cell?</h3>
            <p className="text-gray-300">
              We recruit members at the beginning of each academic year. Check our Updates section or contact us for current openings.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
            <h3 className="text-lg font-semibold text-white mb-3">What domains can I join?</h3>
            <p className="text-gray-300">
              We have departments for Web & Technology, Marketing & PR, Creative & Design, Event Management, and more.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
            <h3 className="text-lg font-semibold text-white mb-3">Can I collaborate with E-Cell?</h3>
            <p className="text-gray-300">
              Yes! We welcome collaborations with other clubs, startups, and organizations. Reach out to discuss partnership opportunities.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
            <h3 className="text-lg font-semibold text-white mb-3">How can I get mentorship?</h3>
            <p className="text-gray-300">
              Our leadership team and alumni provide mentorship to aspiring entrepreneurs. Contact us to schedule a mentorship session.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
