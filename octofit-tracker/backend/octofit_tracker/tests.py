from django.test import TestCase
from .models import User, Team, Workout, Activity, Leaderboard
from django.utils import timezone

class ModelTests(TestCase):
    def setUp(self):
        self.team = Team.objects.create(name='Test Team', description='desc')
        self.user = User.objects.create(name='Test User', email='test@example.com', team=self.team, is_superhero=True)
        self.workout = Workout.objects.create(name='Test Workout', description='desc', difficulty='Easy')
        self.activity = Activity.objects.create(user=self.user, workout=self.workout, date=timezone.now(), duration_minutes=10, calories_burned=100)
        self.leaderboard = Leaderboard.objects.create(user=self.user, score=100, rank=1)

    def test_user(self):
        self.assertEqual(self.user.email, 'test@example.com')

    def test_team(self):
        self.assertEqual(self.team.name, 'Test Team')

    def test_workout(self):
        self.assertEqual(self.workout.name, 'Test Workout')

    def test_activity(self):
        self.assertEqual(self.activity.duration_minutes, 10)

    def test_leaderboard(self):
        self.assertEqual(self.leaderboard.rank, 1)
