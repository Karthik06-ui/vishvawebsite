import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Moment } from './MomentsPage';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  editType: 'moment' | 'letter' | 'photos' | 'content';
  currentData?: any;
  onSave: (data: any) => void;
  momentId?: number;
}

export function EditModal({ isOpen, onClose, editType, currentData, onSave, momentId }: EditModalProps) {
  const [formData, setFormData] = useState<any>(currentData);

  useEffect(() => {
    setFormData(currentData);
  }, [currentData]);

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 px-8 py-6 text-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">
                    {editType === 'moment' && 'Edit Moment'}
                    {editType === 'letter' && 'Edit Love Letter'}
                    {editType === 'photos' && 'Edit Photos'}
                    {editType === 'content' && 'Edit Content'}
                  </h2>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 max-h-[70vh] overflow-y-auto">
                {editType === 'moment' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Image URL
                      </label>
                      <input
                        type="text"
                        value={formData?.image || ''}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-400 focus:outline-none transition-colors"
                        placeholder="Enter image URL from Unsplash or other source"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Caption
                      </label>
                      <textarea
                        value={formData?.caption || ''}
                        onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-400 focus:outline-none transition-colors resize-none"
                        rows={3}
                        placeholder="Enter a romantic caption..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Layout
                      </label>
                      <div className="flex gap-4">
                        {(['left', 'right', 'center'] as const).map((layout) => (
                          <button
                            key={layout}
                            onClick={() => setFormData({ ...formData, layout })}
                            className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all ${
                              formData?.layout === layout
                                ? 'border-pink-500 bg-pink-50 text-pink-700'
                                : 'border-pink-200 hover:border-pink-300'
                            }`}
                          >
                            {layout.charAt(0).toUpperCase() + layout.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {editType === 'letter' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Love Letter
                    </label>
                    <textarea
                      value={formData || ''}
                      onChange={(e) => setFormData(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-400 focus:outline-none transition-colors resize-none font-serif"
                      rows={12}
                      placeholder="Write your heartfelt message..."
                    />
                  </div>
                )}

                {editType === 'photos' && (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      Enter one image URL per line (from Unsplash or other sources)
                    </p>
                    <textarea
                      value={formData?.join('\n') || ''}
                      onChange={(e) => setFormData(e.target.value.split('\n').filter(url => url.trim()))}
                      className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-400 focus:outline-none transition-colors resize-none font-mono text-sm"
                      rows={10}
                      placeholder="https://images.unsplash.com/photo-1..."
                    />
                  </div>
                )}

                {editType === 'content' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Subtitle
                      </label>
                      <input
                        type="text"
                        value={formData?.subtitle || ''}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-400 focus:outline-none transition-colors"
                        placeholder="A beautiful subtitle..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Love Passage
                      </label>
                      <textarea
                        value={formData?.passage || ''}
                        onChange={(e) => setFormData({ ...formData, passage: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-400 focus:outline-none transition-colors resize-none"
                        rows={8}
                        placeholder="Write a beautiful passage about love..."
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-8 py-6 flex justify-end gap-4">
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl border-2 border-gray-300 hover:bg-gray-100 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 transition-all font-semibold shadow-lg"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
