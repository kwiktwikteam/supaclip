const content = {
    "title": "Supaclip",
    "description": "Summarize, transcripts, timestamps & AI assistant for your videos are just a click away",
    "home": {
        "header": {
            "title": "Supaclip",
            "links" : [
                {
                    "id": 1, 
                    "title": "Home",
                    "url": "/",
                    "active": true
                }, 
                {
                    "id": 2, 
                    "title": "Features",
                    "url": "#features",
                    "active": false
                },
                {
                    "id": 3,
                    "title": "Pricing",
                    "url": "#pricing",
                    "active": false
                },
                // {
                //     "id": 4,
                //     "title": "Testimonials",
                //     "url": "#testimonials",
                //     "active": false
                // },
                // {
                //     "id": 5,
                //     "title": "Chrome extension",
                //     "url": "#extension",
                //     "active": false
                // }
            ],
            "button": 
                {
                    "id": 1,
                    "title": "Get Started",
                    "arrow": "",
                    "url": "/create"
                }
            
        },
        "hero": {
            "title": ["Instantly turn any video into", "knowledge base."],
            "subtitle": "Summarize, transcripts, timestamps & AI assistant for your videos are just a click away",
            "button": "Get Started",
            // "more": "50+ users are enjoying this for $0"
        },
        "usecases": {
            "title": ["Some", "Awesome", "Usecases"],
            "usecase": [
                {
                    "id": 1, 
                    "height" : 280,
                    "title": "Content Creators", 
                    "icon": "/images/usecases/creator.png",
                    "desc": "Increase video's organic reach by content distribution"
                },
                {
                    "id": 2, 
                    "height" : 310,
                    "title": "Students", 
                    "icon": "/images/usecases/student.png",
                    "desc": "Get most out of your long lectures using summary & Ai assistant"
                },
                {
                    "id": 3, 
                    "height" : 310,
                    "title": "Podcast Hosts", 
                    "icon": "/images/usecases/podcast.png",
                    "desc": "Offer show notes, transcripts, chatbot for episode recaps and engagement."
                },
                {
                    "id": 4, 
                    "height" : 280,
                    "title": "Researchers", 
                    "icon": "/images/usecases/research.png",
                    "desc": "Extract key insights, quotes, clips from interview videos & documentaries "
                },
            ]
        },
        "steps":{
            "title": ["Three", "easy steps"],
            "steps": [
                {
                    "id": 1, 
                    "title": "Summary Article",
                    "desc": "Quickly understand the main points through a short video summary", 
                    "button": "Join Free",
                    "type": 1,
                    "boxOut" : "bg-light-blue",
                    "boxIn" : "bg-lighter-blue",
                    "image": "/images/steps/step.svg"
                },
                {
                    "id": 2, 
                    "title": "Ai Assistant",
                    "desc": "Chat with an AI assistant trained on your video content.", 
                    "button": "Join Free",
                    "type": 2,
                    "boxOut" : "bg-light-pink",
                    "boxIn" : "bg-lighter-pink",
                    "image": "/images/steps/step-2.svg"
                },
                {
                    "id": 3, 
                    "title": "Transcript & Timestamp",
                    "desc": "Get complete transcript with timestamps to easily navigate the video.", 
                    "button": "Join Free",
                    "type": 1,
                    "boxOut" : "bg-light-darkBlue",
                    "boxIn" : "bg-lighter-darkBlue",
                    "image": "/images/steps/step.svg"
                }
            ]
        },
        "keyFeatures": {
            "title": ["How to use the product with some of its", "key features."],
            "subtitle": "",
            "features": [
                "AI Powered Tweet Writer",
                "2M+ Viral Tweets",
                "Engage with The Right Audience",
                "Write, schedule and boost your tweets"
            ]
        },
        "testimonials": {
            "title": ["What our", "Early Adopters", "are saying"],
            "subtitle": "We’re proud to have helped creators like you write better tweets, and we’re excited to help you do the same",
            "testimonials": [
              {
                "id": 1,
                "height" : 280,
                "name": "William koni",
                "role": "Manager @ Tint",
                "message": "Pretty simple and useful. It's time to say bye-bye to research or design 🚀🏄🏼‍♂️"
              },
              {
                "id": 2,
                "height" : 330,
                "name": "Emanuel greek",
                "role": "Manager @ Trello",
                "message": "I'm super impressed by how intuitive and powerful,this one is the only one that has really worked for me."
              },
              {
                "id": 3,
                "height" : 330,
                "name": "Justin luke",
                "role": "Team Leader @ Logitech",
                "message": "I've been using this product for a few months now, and I can't believe the difference it's made"
              },
              {
                "id": 4,
                "height" : 280,
                "name": "Justin luke",
                "role": "Team Leader @ Logitech",
                "message": "Wow this looks like a game changer. very curious about the product itself."
              }
            ]
        },
        "subscribe": {
            "title": ["Be the first to know about new features,", "special offers, and more."],
            "subtitle": "Don't miss out – sign up for our newsletter today and take your Twitter game to the next level!",
            "button": "Subscribe"
        }
    }
}


export default content;