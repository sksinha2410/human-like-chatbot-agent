"""
Python Integration Example

This example shows how to integrate the chatbot API into a Python application.
"""

import requests
import os
from typing import Optional, Dict, Any
from datetime import datetime

API_URL = os.getenv('CHATBOT_API_URL', 'http://localhost:3000')


class ChatbotClient:
    """Client for interacting with the Human-Like Chatbot Agent API."""
    
    def __init__(self, api_url: str = API_URL):
        """
        Initialize the chatbot client.
        
        Args:
            api_url: Base URL of the chatbot API
        """
        self.api_url = api_url
        self.session = requests.Session()
    
    def chat(
        self,
        user_id: str,
        message: str,
        session_id: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Send a message to the chatbot.
        
        Args:
            user_id: Unique user identifier
            message: User message
            session_id: Optional session ID for context
            
        Returns:
            Dictionary with reply, sessionId, and timestamp
        """
        try:
            response = self.session.post(
                f'{self.api_url}/api/chat',
                json={
                    'userId': user_id,
                    'message': message,
                    'sessionId': session_id
                },
                timeout=10
            )
            response.raise_for_status()
            
            data = response.json()
            return {
                'success': True,
                'reply': data['reply'],
                'sessionId': data['sessionId'],
                'timestamp': data['timestamp']
            }
        except requests.exceptions.RequestException as e:
            print(f'Chat error: {e}')
            return {
                'success': False,
                'error': str(e)
            }
    
    def get_persona(self) -> Optional[Dict[str, Any]]:
        """
        Get chatbot persona information.
        
        Returns:
            Persona details or None if error
        """
        try:
            response = self.session.get(f'{self.api_url}/api/persona', timeout=5)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f'Get persona error: {e}')
            return None
    
    def health_check(self) -> bool:
        """
        Check if chatbot API is healthy.
        
        Returns:
            True if healthy, False otherwise
        """
        try:
            response = self.session.get(f'{self.api_url}/api/health', timeout=5)
            response.raise_for_status()
            data = response.json()
            return data.get('status') == 'healthy'
        except requests.exceptions.RequestException as e:
            print(f'Health check error: {e}')
            return False


def main():
    """Example usage of the ChatbotClient."""
    
    # Initialize client
    chatbot = ChatbotClient()
    
    # Health check
    is_healthy = chatbot.health_check()
    print(f'Chatbot healthy: {is_healthy}')
    
    if not is_healthy:
        print('Chatbot is not healthy')
        return
    
    # Get persona
    persona = chatbot.get_persona()
    print(f'Chatbot persona: {persona}')
    
    # Start conversation
    user_id = 'python-user-123'
    session_id = None
    
    # First message
    response = chatbot.chat(user_id, 'Hi! My name is Sarah')
    print(f"Bot: {response['reply']}")
    session_id = response['sessionId']
    
    # Second message (with context)
    response = chatbot.chat(user_id, 'I love data science', session_id)
    print(f"Bot: {response['reply']}")
    
    # Test memory
    response = chatbot.chat(user_id, 'What is my name?', session_id)
    print(f"Bot: {response['reply']}")
    
    # Test tone adaptation
    response = chatbot.chat(user_id, "I'm feeling sad today", session_id)
    print(f"Bot: {response['reply']}")


if __name__ == '__main__':
    main()
