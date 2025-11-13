'use client'

import { useState } from 'react'

type Question = {
  text: string
  dimension: 'EI' | 'SN' | 'TF' | 'JP'
  direction: 1 | -1
}

const questions: Question[] = [
  // E vs I (Extraversion vs Introversion)
  { text: "I feel energized after spending time at social gatherings with lots of people", dimension: 'EI', direction: 1 },
  { text: "I prefer one-on-one conversations over group discussions", dimension: 'EI', direction: -1 },
  { text: "I often take the initiative to introduce myself to new people", dimension: 'EI', direction: 1 },
  { text: "I need time alone to recharge after social activities", dimension: 'EI', direction: -1 },
  { text: "I enjoy being the center of attention", dimension: 'EI', direction: 1 },
  { text: "I think carefully before speaking in group settings", dimension: 'EI', direction: -1 },
  { text: "I have a wide circle of friends and acquaintances", dimension: 'EI', direction: 1 },

  // S vs N (Sensing vs Intuition)
  { text: "I focus on concrete facts and details rather than abstract concepts", dimension: 'SN', direction: -1 },
  { text: "I enjoy thinking about future possibilities and potential outcomes", dimension: 'SN', direction: 1 },
  { text: "I prefer practical, hands-on learning experiences", dimension: 'SN', direction: -1 },
  { text: "I often get lost in imaginative thinking and daydreaming", dimension: 'SN', direction: 1 },
  { text: "I trust established methods and proven techniques", dimension: 'SN', direction: -1 },
  { text: "I like exploring new theories and innovative approaches", dimension: 'SN', direction: 1 },
  { text: "I pay attention to the present moment and what's happening now", dimension: 'SN', direction: -1 },

  // T vs F (Thinking vs Feeling)
  { text: "I make decisions based on logic and objective analysis", dimension: 'TF', direction: -1 },
  { text: "I consider how my decisions will affect other people's feelings", dimension: 'TF', direction: 1 },
  { text: "I value truth and fairness over harmony in discussions", dimension: 'TF', direction: -1 },
  { text: "I'm deeply moved by other people's emotions and experiences", dimension: 'TF', direction: 1 },
  { text: "I prefer to critique ideas to find flaws and improve them", dimension: 'TF', direction: -1 },
  { text: "I prioritize maintaining positive relationships when problem-solving", dimension: 'TF', direction: 1 },
  { text: "I find it easy to stay detached and objective in conflicts", dimension: 'TF', direction: -1 },

  // J vs P (Judging vs Perceiving)
  { text: "I prefer to plan things in advance and stick to a schedule", dimension: 'JP', direction: -1 },
  { text: "I like to keep my options open and be spontaneous", dimension: 'JP', direction: 1 },
  { text: "I feel uncomfortable when things are disorganized or uncertain", dimension: 'JP', direction: -1 },
  { text: "I work best under pressure and close to deadlines", dimension: 'JP', direction: 1 },
  { text: "I make to-do lists and enjoy checking items off", dimension: 'JP', direction: -1 },
  { text: "I'm comfortable adapting plans as new information comes in", dimension: 'JP', direction: 1 },
  { text: "I prefer to complete tasks well before they're due", dimension: 'JP', direction: -1 },
]

type PersonalityType = {
  code: string
  name: string
  description: string
  traits: string[]
}

const personalityTypes: Record<string, PersonalityType> = {
  INTJ: {
    code: 'INTJ',
    name: 'The Architect',
    description: 'Strategic, analytical, and innovative thinkers with a thirst for knowledge. You see the world as a chess board, always thinking several moves ahead.',
    traits: [
      'Independent and self-confident',
      'Strategic thinkers who love complex problems',
      'High standards for themselves and others',
      'Value competence and efficiency'
    ]
  },
  INTP: {
    code: 'INTP',
    name: 'The Logician',
    description: 'Philosophical innovators fascinated by logical analysis and systems. You love exploring theories and finding underlying principles.',
    traits: [
      'Abstract thinkers who love analyzing patterns',
      'Curious and always seeking knowledge',
      'Flexible and adaptable to new information',
      'Independent and unconventional'
    ]
  },
  ENTJ: {
    code: 'ENTJ',
    name: 'The Commander',
    description: 'Bold, imaginative, and strong-willed leaders who find a way or make one. You thrive on challenges and organizing people to achieve goals.',
    traits: [
      'Natural leaders who take charge',
      'Strategic and goal-oriented',
      'Confident and assertive',
      'Efficient and decisive'
    ]
  },
  ENTP: {
    code: 'ENTP',
    name: 'The Debater',
    description: 'Smart, curious thinkers who love intellectual challenges. You enjoy playing devil\'s advocate and exploring all sides of an issue.',
    traits: [
      'Quick thinkers who enjoy debates',
      'Innovative and entrepreneurial',
      'Adaptable and resourceful',
      'Charismatic and energetic'
    ]
  },
  INFJ: {
    code: 'INFJ',
    name: 'The Advocate',
    description: 'Quiet, mystical, and inspiring idealists. You have deeply held beliefs and work tirelessly to make the world a better place.',
    traits: [
      'Insightful and idealistic',
      'Creative and compassionate',
      'Organized and decisive about values',
      'Deep and meaningful connections'
    ]
  },
  INFP: {
    code: 'INFP',
    name: 'The Mediator',
    description: 'Poetic, kind, and altruistic people always eager to help a good cause. You seek meaning and authenticity in all you do.',
    traits: [
      'Guided by principles and values',
      'Creative and imaginative',
      'Open-minded and flexible',
      'Passionate about helping others'
    ]
  },
  ENFJ: {
    code: 'ENFJ',
    name: 'The Protagonist',
    description: 'Charismatic, inspiring leaders who are able to mesmerize their listeners. You feel called to serve a greater purpose.',
    traits: [
      'Natural mentors and leaders',
      'Warm and empathetic',
      'Organized and decisive',
      'Excellent communicators'
    ]
  },
  ENFP: {
    code: 'ENFP',
    name: 'The Campaigner',
    description: 'Enthusiastic, creative, and sociable free spirits who can always find a reason to smile. You see life as full of possibilities.',
    traits: [
      'Energetic and enthusiastic',
      'Creative and spontaneous',
      'People-oriented and empathetic',
      'Curious and open-minded'
    ]
  },
  ISTJ: {
    code: 'ISTJ',
    name: 'The Logistician',
    description: 'Practical and fact-minded individuals whose reliability cannot be doubted. You believe in traditions and working within established systems.',
    traits: [
      'Responsible and dependable',
      'Organized and detail-oriented',
      'Logical and practical',
      'Value tradition and loyalty'
    ]
  },
  ISFJ: {
    code: 'ISFJ',
    name: 'The Defender',
    description: 'Very dedicated and warm protectors, always ready to defend loved ones. You combine practicality with deep care for others.',
    traits: [
      'Supportive and loyal',
      'Detail-oriented and thorough',
      'Patient and hardworking',
      'Practical helpers who value harmony'
    ]
  },
  ESTJ: {
    code: 'ESTJ',
    name: 'The Executive',
    description: 'Excellent administrators who excel at managing things and people. You believe in order, structure, and getting things done.',
    traits: [
      'Organized and efficient',
      'Direct and honest',
      'Strong sense of duty',
      'Results-oriented leaders'
    ]
  },
  ESFJ: {
    code: 'ESFJ',
    name: 'The Consul',
    description: 'Extraordinarily caring, social, and popular people always eager to help. You thrive on harmony and cooperation.',
    traits: [
      'Warm and caring',
      'Organized and dutiful',
      'Strong sense of community',
      'Practical helpers who value tradition'
    ]
  },
  ISTP: {
    code: 'ISTP',
    name: 'The Virtuoso',
    description: 'Bold and practical experimenters, masters of all kinds of tools. You love understanding how things work through hands-on experience.',
    traits: [
      'Practical and hands-on',
      'Logical problem-solvers',
      'Adaptable and spontaneous',
      'Independent and self-reliant'
    ]
  },
  ISFP: {
    code: 'ISFP',
    name: 'The Adventurer',
    description: 'Flexible and charming artists, always ready to explore and experience something new. You live in the moment and express yourself through action.',
    traits: [
      'Creative and artistic',
      'Sensitive and caring',
      'Flexible and spontaneous',
      'Value personal freedom'
    ]
  },
  ESTP: {
    code: 'ESTP',
    name: 'The Entrepreneur',
    description: 'Smart, energetic, and perceptive people who truly enjoy living on the edge. You dive into action and make things happen.',
    traits: [
      'Energetic and action-oriented',
      'Pragmatic and realistic',
      'Sociable and fun-loving',
      'Quick decision-makers'
    ]
  },
  ESFP: {
    code: 'ESFP',
    name: 'The Entertainer',
    description: 'Spontaneous, energetic, and enthusiastic people who love life and everything in it. You bring excitement and joy wherever you go.',
    traits: [
      'Outgoing and friendly',
      'Spontaneous and playful',
      'Practical and down-to-earth',
      'Generous and warm-hearted'
    ]
  }
}

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [result, setResult] = useState<string | null>(null)

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateResult(newAnswers)
    }
  }

  const calculateResult = (finalAnswers: number[]) => {
    const scores = {
      EI: 0,  // Positive = Extraversion, Negative = Introversion
      SN: 0,  // Positive = Intuition, Negative = Sensing
      TF: 0,  // Positive = Feeling, Negative = Thinking
      JP: 0   // Positive = Perceiving, Negative = Judging
    }

    finalAnswers.forEach((answer, index) => {
      const question = questions[index]
      const value = (answer - 3) * question.direction
      scores[question.dimension] += value
    })

    const type =
      (scores.EI > 0 ? 'E' : 'I') +
      (scores.SN > 0 ? 'N' : 'S') +
      (scores.TF > 0 ? 'F' : 'T') +
      (scores.JP > 0 ? 'P' : 'J')

    setResult(type)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setResult(null)
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (result) {
    const personality = personalityTypes[result]
    return (
      <div className="container">
        <div className="header">
          <h1>Your Personality Type</h1>
          <p>Based on your answers</p>
        </div>
        <div className="content">
          <div className="result-container">
            <div className="result-type">{personality.code}</div>
            <div className="result-name">{personality.name}</div>
            <div className="result-description">{personality.description}</div>
            <div className="result-traits">
              <h3>Key Traits</h3>
              {personality.traits.map((trait, index) => (
                <div key={index} className="trait-item">
                  <span className="trait-label">•</span>
                  {trait}
                </div>
              ))}
            </div>
            <button className="button-primary" onClick={resetQuiz}>
              Take Quiz Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="header">
        <h1>MBTI Personality Quiz</h1>
        <p>Discover your personality type • 2 minutes</p>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="content">
        <div className="question-container">
          <div className="question-number">
            Question {currentQuestion + 1} of {questions.length}
          </div>
          <div className="question-text">
            {questions[currentQuestion].text}
          </div>
          <div className="options">
            <button
              className="option-button"
              onClick={() => handleAnswer(1)}
            >
              Strongly Disagree
            </button>
            <button
              className="option-button"
              onClick={() => handleAnswer(2)}
            >
              Disagree
            </button>
            <button
              className="option-button"
              onClick={() => handleAnswer(3)}
            >
              Neutral
            </button>
            <button
              className="option-button"
              onClick={() => handleAnswer(4)}
            >
              Agree
            </button>
            <button
              className="option-button"
              onClick={() => handleAnswer(5)}
            >
              Strongly Agree
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
