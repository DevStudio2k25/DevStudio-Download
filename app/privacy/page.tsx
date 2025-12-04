'use client'

import Navbar from '@/components/navbar'
import { Shield, Lock, Eye, Users, Database, FileText, Mail, Phone } from 'lucide-react'

export default function PrivacyPolicy() {
    return (
        <main className="relative w-full min-h-screen overflow-hidden bg-background">
            <Navbar />

            <div className="lg:pl-20 xl:pl-72">
                {/* Background Effects */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-[#00E5FF] to-[#7C3AED] opacity-10 blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-tr from-[#7C3AED] to-[#06C1A0] opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-4xl mx-auto px-4 py-20">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#00E5FF] mb-6 shadow-lg shadow-[#7C3AED]/30">
                            <Shield className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] bg-clip-text text-transparent">
                            Privacy Policy
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Last Updated: 04 December 2025
                        </p>
                    </div>

                    {/* Introduction */}
                    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 mb-8">
                        <p className="text-gray-300 leading-relaxed">
                            DevStudio ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how our application collects, uses, and safeguards your information. By using DevStudio, you agree to the practices described in this policy.
                        </p>
                    </div>

                    {/* Sections */}
                    <div className="space-y-8">
                        {/* Section 1 */}
                        <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-[#00E5FF]/30 transition-colors duration-300">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7C3AED]/20 to-[#00E5FF]/20 flex items-center justify-center flex-shrink-0">
                                    <Database className="w-6 h-6 text-[#00E5FF]" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
                                </div>
                            </div>

                            <div className="space-y-6 ml-16">
                                <div>
                                    <h3 className="text-xl font-semibold text-[#00E5FF] mb-3">a. Personal Information (Provided by You)</h3>
                                    <p className="text-gray-300 mb-3">We may collect the following information when you use certain features:</p>
                                    <ul className="list-disc list-inside text-gray-400 space-y-2">
                                        <li>Name or username</li>
                                        <li>Email address</li>
                                        <li>Profile image (optional)</li>
                                        <li>Posts, comments, likes, and other content you share</li>
                                        <li>Contact information you provide for support</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-[#00E5FF] mb-3">b. Automatically Collected Information</h3>
                                    <p className="text-gray-300 mb-3">When you use the app, we may collect:</p>
                                    <ul className="list-disc list-inside text-gray-400 space-y-2">
                                        <li>Device information (model, OS version, unique identifiers)</li>
                                        <li>Usage data and analytics</li>
                                        <li>Crash logs and performance data</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-[#00E5FF] mb-3">c. No Sensitive Data</h3>
                                    <p className="text-gray-300 mb-3">We do not collect:</p>
                                    <ul className="list-disc list-inside text-gray-400 space-y-2">
                                        <li>Payment information</li>
                                        <li>Financial details</li>
                                        <li>Biometric data</li>
                                        <li>Location data unless explicitly given by you</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-[#00E5FF]/30 transition-colors duration-300">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7C3AED]/20 to-[#00E5FF]/20 flex items-center justify-center flex-shrink-0">
                                    <Eye className="w-6 h-6 text-[#00E5FF]" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
                                </div>
                            </div>

                            <div className="ml-16">
                                <p className="text-gray-300 mb-3">We use the collected information to:</p>
                                <ul className="list-disc list-inside text-gray-400 space-y-2">
                                    <li>Provide and improve app features</li>
                                    <li>Maintain user accounts and profiles</li>
                                    <li>Enable community posts and interactions</li>
                                    <li>Provide AI tools and personalized suggestions</li>
                                    <li>Enhance app performance and stability</li>
                                    <li>Communicate updates or support responses</li>
                                    <li>Prevent fraudulent or harmful activity</li>
                                </ul>
                                <p className="text-[#00E5FF] font-semibold mt-4">We do not sell your information to third parties.</p>
                            </div>
                        </section>

                        {/* Section 3 */}
                        <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-[#00E5FF]/30 transition-colors duration-300">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7C3AED]/20 to-[#00E5FF]/20 flex items-center justify-center flex-shrink-0">
                                    <Users className="w-6 h-6 text-[#00E5FF]" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-4">3. Third-Party Services</h2>
                                </div>
                            </div>

                            <div className="ml-16">
                                <p className="text-gray-300 mb-3">DevStudio may use trusted third-party tools and services such as:</p>
                                <ul className="list-disc list-inside text-gray-400 space-y-2">
                                    <li>Analytics providers</li>
                                    <li>Crash reporting tools</li>
                                    <li>AI model integrations</li>
                                    <li>Content delivery services</li>
                                </ul>
                                <p className="text-gray-300 mt-4">These third parties may collect limited technical data to operate properly. All third-party services follow their own privacy policies.</p>
                            </div>
                        </section>

                        {/* Section 4 */}
                        <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-[#00E5FF]/30 transition-colors duration-300">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7C3AED]/20 to-[#00E5FF]/20 flex items-center justify-center flex-shrink-0">
                                    <FileText className="w-6 h-6 text-[#00E5FF]" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-4">4. User-Generated Content</h2>
                                </div>
                            </div>

                            <div className="ml-16">
                                <p className="text-gray-300 mb-3">Any posts, comments, images, or content you publish inside DevStudio may be visible to other users. You are responsible for the information you share publicly.</p>
                                <p className="text-gray-400">We reserve the right to remove content that violates our guidelines.</p>
                            </div>
                        </section>

                        {/* Section 5 */}
                        <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-[#00E5FF]/30 transition-colors duration-300">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7C3AED]/20 to-[#00E5FF]/20 flex items-center justify-center flex-shrink-0">
                                    <Lock className="w-6 h-6 text-[#00E5FF]" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-4">5. Data Storage & Security</h2>
                                </div>
                            </div>

                            <div className="ml-16">
                                <p className="text-gray-300">We use secure databases and modern encryption practices to protect your data. However, no method of internet transmission is 100% secure. We work continuously to safeguard your information and ensure privacy.</p>
                            </div>
                        </section>

                        {/* Section 6 */}
                        <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-[#00E5FF]/30 transition-colors duration-300">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7C3AED]/20 to-[#00E5FF]/20 flex items-center justify-center flex-shrink-0">
                                    <Shield className="w-6 h-6 text-[#00E5FF]" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights</h2>
                                </div>
                            </div>

                            <div className="ml-16">
                                <p className="text-gray-300 mb-3">You have the right to:</p>
                                <ul className="list-disc list-inside text-gray-400 space-y-2">
                                    <li>Access your information</li>
                                    <li>Update or edit your profile details</li>
                                    <li>Delete posts or content you create</li>
                                    <li>Request deletion of your account data</li>
                                    <li>Contact us anytime for data-related concerns</li>
                                </ul>
                            </div>
                        </section>

                        {/* Section 7 */}
                        <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-[#00E5FF]/30 transition-colors duration-300">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7C3AED]/20 to-[#00E5FF]/20 flex items-center justify-center flex-shrink-0">
                                    <Users className="w-6 h-6 text-[#00E5FF]" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-4">7. Children's Privacy</h2>
                                </div>
                            </div>

                            <div className="ml-16">
                                <p className="text-gray-300">DevStudio is intended for users 13 years and older. We do not knowingly collect data from children under 13. If such data is discovered, we will remove it immediately.</p>
                            </div>
                        </section>

                        {/* Section 8 */}
                        <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-[#00E5FF]/30 transition-colors duration-300">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7C3AED]/20 to-[#00E5FF]/20 flex items-center justify-center flex-shrink-0">
                                    <FileText className="w-6 h-6 text-[#00E5FF]" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-4">8. Changes to This Policy</h2>
                                </div>
                            </div>

                            <div className="ml-16">
                                <p className="text-gray-300">We may update this Privacy Policy from time to time. Changes will be reflected on this page along with the "Last Updated" date. Your continued use of the app signifies acceptance of updated policies.</p>
                            </div>
                        </section>

                        {/* Section 9 - Contact */}
                        <section className="bg-gradient-to-br from-[#7C3AED]/10 to-[#00E5FF]/10 backdrop-blur-sm border border-[#00E5FF]/30 rounded-2xl p-8">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#00E5FF] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#7C3AED]/30">
                                    <Mail className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-4">9. Contact Us</h2>
                                </div>
                            </div>

                            <div className="ml-16 space-y-4">
                                <p className="text-gray-300">If you have any questions regarding this Privacy Policy, please contact us:</p>
                                <div className="flex flex-col gap-3">
                                    <a href="mailto:devstudio2k25@gmail.com" className="flex items-center gap-3 text-[#00E5FF] hover:text-[#00E5FF]/80 transition-colors">
                                        <Mail className="w-5 h-5" />
                                        <span>devstudio2k25@gmail.com</span>
                                    </a>
                                    <a href="tel:7073949813" className="flex items-center gap-3 text-[#00E5FF] hover:text-[#00E5FF]/80 transition-colors">
                                        <Phone className="w-5 h-5" />
                                        <span>7073949813</span>
                                    </a>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Footer Note */}
                    <div className="text-center mt-16 pb-8">
                        <p className="text-gray-500 text-sm">
                            © 2025 DevStudio. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}
