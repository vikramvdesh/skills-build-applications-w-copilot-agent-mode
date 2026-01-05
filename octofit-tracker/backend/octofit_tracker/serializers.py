from rest_framework import serializers
from .models import FitnessUser, Team, Activity, Workout, Leaderboard

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'

class FitnessUserSerializer(serializers.ModelSerializer):
    team_name = serializers.SerializerMethodField()
    
    class Meta:
        model = FitnessUser
        fields = ['id', 'name', 'email', 'team_id', 'team_name', 'password']
    
    def get_team_name(self, obj):
        try:
            team = Team.objects.get(id=obj.team_id)
            return team.name
        except Team.DoesNotExist:
            return None
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = FitnessUser(**validated_data)
        user.set_password(password)
        user.save()
        return user

class ActivitySerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Activity
        fields = ['id', 'user_id', 'user_name', 'type', 'duration', 'date']
    
    def get_user_name(self, obj):
        try:
            user = FitnessUser.objects.get(id=obj.user_id)
            return user.name
        except FitnessUser.DoesNotExist:
            return None

class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = '__all__'

class LeaderboardSerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Leaderboard
        fields = ['id', 'user_id', 'user_name', 'score']
    
    def get_user_name(self, obj):
        try:
            user = FitnessUser.objects.get(id=obj.user_id)
            return user.name
        except FitnessUser.DoesNotExist:
            return None
