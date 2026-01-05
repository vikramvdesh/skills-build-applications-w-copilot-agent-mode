from django.contrib import admin
from .models import FitnessUser, Team, Activity, Workout, Leaderboard

admin.site.register(FitnessUser)
admin.site.register(Team)
admin.site.register(Activity)
admin.site.register(Workout)
admin.site.register(Leaderboard)
