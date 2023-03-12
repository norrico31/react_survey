<?php

namespace App\Http\Controllers;

use App\Http\Resources\SurveyAnswerResource;
use App\Http\Resources\SurveyDashboardResource;
use App\Models\Survey;
use App\Models\SurveyAnswer;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    //
    public function index(Request $request)
    {
        $user = $request->user();

        // total number of surveys from current user
        $total = Survey::query()->where('user_id', $user->id)->count();

        // latest survey
        $latest = Survey::query()->where('user_id', $user->id)->latest('created_at')->first();

        // total number of answers
        $total_answers = SurveyAnswer::query()
            ->join('surveys', 'survey_answers.survey_id', '=', 'surveys.id')
            ->where('surveys.user_id', $user->id)
            ->count();

        // latest 5 answer
        $latest_answers = SurveyAnswer::query()
            ->join('surveys', 'survey_answers.survey_id', '=', 'surveys.id')
            ->where('surveys.user_id', $user->id)
            ->orderBy('end_date', 'DESC')
            ->limit(5)
            ->getModels('survey_answers.*');

        return [
            'total_surveys' => $total,
            'latest_survey' => $latest ? new SurveyDashboardResource($latest) : null,
            'total_answers' => $total_answers,
            'latest_answers' => SurveyAnswerResource::collection($latest_answers)
        ];
    }
}
