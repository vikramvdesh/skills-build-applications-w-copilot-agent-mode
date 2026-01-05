from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from octofit_tracker.models import FitnessUser, Team, Activity, Leaderboard, Workout
from django.db import connection

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        from octofit_tracker.models import FitnessUser  # Use the custom User model
        # Clear existing data
        # Drop collections directly to avoid unhashable model errors
        db = connection.cursor().db_conn
        for collection in ["leaderboard", "activities", "workouts", "users", "teams"]:
            try:
                db[collection].drop()
            except Exception as e:
                self.stdout.write(self.style.WARNING(f"Could not drop collection {collection}: {e}"))

        # Create Teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create Users (superheroes)
        users = [
            FitnessUser.objects.create(name='Iron Man', email='ironman@marvel.com', team=marvel),
            FitnessUser.objects.create(name='Captain America', email='cap@marvel.com', team=marvel),
            FitnessUser.objects.create(name='Batman', email='batman@dc.com', team=dc),
            FitnessUser.objects.create(name='Wonder Woman', email='wonderwoman@dc.com', team=dc),
        ]

        # Create Workouts
        workout1 = Workout.objects.create(name='Pushups', description='Upper body strength', suggested_for='Strength')
        workout2 = Workout.objects.create(name='Running', description='Cardio endurance', suggested_for='Cardio')

        # Create Activities
        from datetime import date
        Activity.objects.create(user=users[0], type='Pushups', duration=30, date=date.today())
        Activity.objects.create(user=users[1], type='Running', duration=45, date=date.today())
        Activity.objects.create(user=users[2], type='Pushups', duration=20, date=date.today())
        Activity.objects.create(user=users[3], type='Running', duration=60, date=date.today())

        # Create Leaderboard
        Leaderboard.objects.create(user=users[0], score=100)
        Leaderboard.objects.create(user=users[1], score=200)
        Leaderboard.objects.create(user=users[2], score=150)
        Leaderboard.objects.create(user=users[3], score=250)

        # Ensure unique index on email (MongoDB shell command)
        # This is best done via mongosh, but for demonstration, we attempt via Djongo raw command
        try:
            with connection.cursor() as cursor:
                cursor.execute('db.users.createIndex({ "email": 1 }, { unique: true })')
        except Exception as e:
            self.stdout.write(self.style.WARNING(f'Index creation warning: {e}'))

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
