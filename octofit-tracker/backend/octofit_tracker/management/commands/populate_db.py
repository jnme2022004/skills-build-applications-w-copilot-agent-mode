from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Workout, Activity, Leaderboard
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()
        Workout.objects.all().delete()

        # Create Teams
        marvel = Team.objects.create(name='Marvel', description='Team Marvel')
        dc = Team.objects.create(name='DC', description='Team DC')

        # Create Users (superheroes)
        users = [
            User.objects.create(name='Spider-Man', email='spiderman@marvel.com', team=marvel, is_superhero=True),
            User.objects.create(name='Iron Man', email='ironman@marvel.com', team=marvel, is_superhero=True),
            User.objects.create(name='Wonder Woman', email='wonderwoman@dc.com', team=dc, is_superhero=True),
            User.objects.create(name='Batman', email='batman@dc.com', team=dc, is_superhero=True),
        ]

        # Create Workouts
        workouts = [
            Workout.objects.create(name='Push Ups', description='Upper body workout', difficulty='Easy'),
            Workout.objects.create(name='Running', description='Cardio workout', difficulty='Medium'),
            Workout.objects.create(name='Deadlift', description='Strength workout', difficulty='Hard'),
        ]

        # Create Activities
        for user in users:
            for workout in workouts:
                Activity.objects.create(
                    user=user,
                    workout=workout,
                    date=timezone.now(),
                    duration_minutes=30,
                    calories_burned=200
                )

        # Create Leaderboard
        for i, user in enumerate(users):
            Leaderboard.objects.create(user=user, score=100*(len(users)-i), rank=i+1)

        self.stdout.write(self.style.SUCCESS('Test data populated successfully.'))
