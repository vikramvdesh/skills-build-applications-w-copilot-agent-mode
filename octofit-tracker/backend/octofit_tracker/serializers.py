from rest_framework import serializers
from .models import FitnessUser, Team, Activity, Workout, Leaderboard

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'

class FitnessUserSerializer(serializers.ModelSerializer):
    team = TeamSerializer(read_only=True)
    team_id = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all(), source='team', write_only=True)
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = FitnessUser
        fields = ['id', 'name', 'email', 'team', 'team_id', 'password']
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = FitnessUser(**validated_data)
        user.set_password(password)
        user.save()
        return user

class ActivitySerializer(serializers.ModelSerializer):
    user = FitnessUserSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(queryset=FitnessUser.objects.all(), source='user', write_only=True)
    class Meta:
        model = Activity
        fields = ['id', 'user', 'user_id', 'type', 'duration', 'date']

class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = '__all__'

class LeaderboardSerializer(serializers.ModelSerializer):
    user = FitnessUserSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(queryset=FitnessUser.objects.all(), source='user', write_only=True)
    class Meta:
        model = Leaderboard
        fields = ['id', 'user', 'user_id', 'score']
