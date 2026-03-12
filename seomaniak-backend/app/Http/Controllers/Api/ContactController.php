<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function index()
    {
        $contacts = Contact::all();
        return response()->json([
            'success' => true,
            'data' => $contacts
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|unique:contacts,email',
            'telephone' => 'nullable|string|max:20',
        ]);

        $contact = Contact::create($validatedData);

        return response()->json([
            'success' => true,
            'data' => $contact,
            'message' => 'Contact créé avec succès'
        ], 201);
    }

    public function show(Contact $contact)
    {
        return response()->json([
            'success' => true,
            'data' => $contact
        ]);
    }

   public function update(Request $request, $id)
{
    $contact = Contact::find($id);
    
    if (!$contact) {
        return response()->json([
            'success' => false,
            'message' => 'Contact non trouvé'
        ], 404);
    }
    
    $validatedData = $request->validate([
        'nom' => 'sometimes|string|max:255',
        'prenom' => 'sometimes|string|max:255',
        'email' => 'sometimes|email|unique:contacts,email,' . $id,
        'telephone' => 'nullable|string|max:20',
    ]);

    $contact->update($validatedData);

    return response()->json([
        'success' => true,
        'data' => $contact,
        'message' => 'Contact mis à jour avec succès'
    ]);
}
    public function destroy(Contact $contact)
    {
        $contact->delete();

        return response()->json([
            'success' => true,
            'message' => 'Contact supprimé avec succès'
        ]);
    }
}