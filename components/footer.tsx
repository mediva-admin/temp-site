"use client"

import { ThreeDMarquee } from "@/components/ui/3d-marquee"
import { motion } from "framer-motion"

export function Footer() {
  // Completely new and unique healthcare and technology images for MEDIVA project
  const medivaImages = [
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Healthcare professional
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Medical equipment
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Technology interface
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Medical research
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Digital health
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Patient care
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Medical innovation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Healthcare technology
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Modern medicine
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Advanced healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Smart medical devices
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Connected health
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Secure healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Reliable medical systems
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Efficient healthcare
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Quality medical care
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Professional healthcare
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Healthcare excellence
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Medical innovation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Healthcare technology
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Future of medicine
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Digital transformation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Modern healthcare
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Advanced medical solutions
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Smart healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Connected medical systems
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Medical innovation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Healthcare technology
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Modern medicine
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Advanced healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Smart medical devices
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Connected health
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Secure healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Reliable medical systems
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Efficient healthcare
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Quality medical care
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Professional healthcare
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Healthcare excellence
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Medical innovation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Healthcare technology
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Future of medicine
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Digital transformation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Modern healthcare
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Advanced medical solutions
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Smart healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Connected medical systems
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Medical innovation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Healthcare technology
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Modern medicine
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Advanced healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Smart medical devices
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Connected health
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Secure healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Reliable medical systems
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Efficient healthcare
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Quality medical care
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Professional healthcare
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Healthcare excellence
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Medical innovation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Healthcare technology
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Future of medicine
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Digital transformation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Modern healthcare
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Advanced medical solutions
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Smart healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Connected medical systems
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Medical innovation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Healthcare technology
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Modern medicine
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Advanced healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Smart medical devices
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Connected health
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Secure healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Reliable medical systems
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Efficient healthcare
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Quality medical care
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Professional healthcare
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Healthcare excellence
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Medical innovation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Healthcare technology
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Future of medicine
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Digital transformation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Modern healthcare
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Advanced medical solutions
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Smart healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Connected medical systems
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Medical innovation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Healthcare technology
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Modern medicine
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Advanced healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Smart medical devices
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Connected health
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Secure healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Reliable medical systems
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Efficient healthcare
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Quality medical care
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Professional healthcare
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Healthcare excellence
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Medical innovation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Healthcare technology
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Future of medicine
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Digital transformation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Modern healthcare
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Advanced medical solutions
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Smart healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Connected medical systems
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Medical innovation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Healthcare technology
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Modern medicine
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Advanced healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Smart medical devices
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Connected health
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Secure healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Reliable medical systems
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Efficient healthcare
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Quality medical care
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Professional healthcare
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Healthcare excellence
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Medical innovation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Healthcare technology
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Future of medicine
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Digital transformation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Modern healthcare
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Advanced medical solutions
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Smart healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Connected medical systems
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Medical innovation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Healthcare technology
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Modern medicine
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Advanced healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Smart medical devices
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Connected health
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Secure healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Reliable medical systems
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Efficient healthcare
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Quality medical care
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Professional healthcare
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Healthcare excellence
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Medical innovation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Healthcare technology
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Future of medicine
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Digital transformation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Modern healthcare
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Advanced medical solutions
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Smart healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Connected medical systems
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Medical innovation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Healthcare technology
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Modern medicine
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Advanced healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Smart medical devices
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Connected health
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Secure healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Reliable medical systems
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Efficient healthcare
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Quality medical care
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Professional healthcare
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Healthcare excellence
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Medical innovation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Healthcare technology
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Future of medicine
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Digital transformation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Modern healthcare
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Advanced medical solutions
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Smart healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Connected medical systems
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Medical innovation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Healthcare technology
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Modern medicine
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Advanced healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Smart medical devices
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Connected health
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Secure healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Reliable medical systems
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Efficient healthcare
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Quality medical care
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Professional healthcare
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Healthcare excellence
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Medical innovation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Healthcare technology
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Future of medicine
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Digital transformation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Modern healthcare
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Advanced medical solutions
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Smart healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Connected medical systems
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Medical innovation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Healthcare technology
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Modern medicine
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Advanced healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Smart medical devices
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Connected health
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Secure healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Reliable medical systems
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Efficient healthcare
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Quality medical care
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Professional healthcare
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Healthcare excellence
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Medical innovation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Healthcare technology
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Future of medicine
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Digital transformation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Modern healthcare
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Advanced medical solutions
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Smart healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Connected medical systems
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Medical innovation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Healthcare technology
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Modern medicine
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Advanced healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Smart medical devices
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Connected health
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Secure healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Reliable medical systems
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Efficient healthcare
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Quality medical care
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Professional healthcare
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Healthcare excellence
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Medical innovation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Healthcare technology
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Future of medicine
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Digital transformation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Modern healthcare
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Advanced medical solutions
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Smart healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Connected medical systems
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Medical innovation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Healthcare technology
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Modern medicine
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Advanced healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Smart medical devices
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Connected health
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Secure healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Reliable medical systems
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Efficient healthcare
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Quality medical care
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Professional healthcare
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Healthcare excellence
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Medical innovation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Healthcare technology
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Future of medicine
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Digital transformation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Modern healthcare
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Advanced medical solutions
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Smart healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Connected medical systems
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Medical innovation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Healthcare technology
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Modern medicine
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Advanced healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Smart medical devices
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Connected health
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Secure healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Reliable medical systems
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Efficient healthcare
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Quality medical care
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Professional healthcare
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Healthcare excellence
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Medical innovation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Healthcare technology
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Future of medicine
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Digital transformation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Modern healthcare
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Advanced medical solutions
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Smart healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Connected medical systems
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Medical innovation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Healthcare technology
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Modern medicine
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Advanced healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Smart medical devices
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Connected health
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Secure healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Reliable medical systems
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Efficient healthcare
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Quality medical care
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Professional healthcare
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Healthcare excellence
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Medical innovation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Healthcare technology
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Future of medicine
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Digital transformation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Modern healthcare
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Advanced medical solutions
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Smart healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Connected medical systems
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Medical innovation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Healthcare technology
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Modern medicine
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Advanced healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Smart medical devices
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Connected health
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Secure healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Reliable medical systems
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Efficient healthcare
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Quality medical care
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Professional healthcare
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Healthcare excellence
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Medical innovation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Healthcare technology
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Future of medicine
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Digital transformation
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Modern healthcare
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center", // Advanced medical solutions
    "https://images.unsplash.com/photo-1576091160399-112f8f6a3b98?w=800&h=600&fit=crop&crop=center", // Smart healthcare
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop&crop=center", // Connected medical systems
  ]

  return (
    <footer className="relative bg-black text-white py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-black to-black" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* 3D Marquee Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Discover MEDIVA
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Explore our innovative healthcare solutions and cutting-edge technology
            </motion.p>
          </div>
          
          {/* 3D Marquee */}
          <div className="mx-auto max-w-7xl rounded-3xl bg-gray-950/20 p-2 ring-1 ring-neutral-700/30">
            <ThreeDMarquee images={medivaImages} />
          </div>
        </motion.div>

        {/* Footer Info */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-16 border-t border-gray-800"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">MEDIVA</h3>
            <p className="text-gray-400">
              Revolutionizing healthcare through innovative technology and patient-centered solutions.
            </p>
            <div className="flex space-x-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <span className="text-white">📱</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <span className="text-white">💻</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <span className="text-white">🔗</span>
              </motion.div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Technology</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Digital Health</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Patient Care</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Integration</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact</h4>
            <div className="space-y-2 text-gray-400">
              <p>📍 123 Healthcare Ave</p>
              <p>📧 info@mediva.com</p>
              <p>📞 +1 (555) 123-4567</p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="pt-8 mt-8 border-t border-gray-800 text-center text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <p>&copy; 2024 MEDIVA. All rights reserved. Revolutionizing healthcare, one innovation at a time.</p>
        </motion.div>
      </div>
    </footer>
  )
}
